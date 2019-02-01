import {Component,OnDestroy,OnInit} from '@angular/core';
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from "rxjs";
//调用公共方法类
import {CommonMethodsService} from "../../../../../common/methods/commonMethods.service";
import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {
    WORKFLOW_CUO_LOU_FA_API,
    WORKFLOW_CUO_LOU_FA_VIEWDATA_YEAR_API,
    WORKFLOW_CUO_LOU_FA_VIEWDATA_MONTH_API,
    WORKFLOW_CUO_LOU_FA_VIEWDATA_DAY_API,
    WORKFLOW_CUO_LOU_FA_SEARCH_BY_API,
    WORKFLOW_CUO_LOU_FA_BatchDelete_API,
} from '../../../../../app.constants';
// 添加新数据组件
import {ClfEditComponent} from "../clf-edit/clf-edit.component";
import {ClfBatchEditComponent} from "../clf-batchEdit/clf-batchEdit.component";
import {ClfDetailComponent} from "../clf-detail/clf-detail.component";
import {ClfViewDataComponent} from '../../../../../common/chart/chart.component';
import {ClfExportComponent} from "../clf-export/clf-export.component";
import {Principal} from "../../../../../core/index";
import {LogService} from "../../../../../common/index";//引入自定义log服务 可控制线上/调试模式输出情况
@Component({
  selector: 'demo-clf',
  templateUrl: './clf-list.component.html',
  styleUrls: ['../../../../../../content/scss/table.scss','../../../../../../content/css/my-appraise.css'],
})
export class DemoClfComponent implements OnInit,OnDestroy{
    list:any;//保存返回结果的副本 用于全选反选处理
    clfInfos: ApproverCommonInfo[];//保存返回结果
    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    previousPage: any;//上一页
    totalItems:any;//总页数
    totalElements:any;//总页数
    subInfo:Subscription;//订阅编辑成功广播消息
    searchYear:Subscription;//订阅选择年时广播的信息
    searchMonth:Subscription;//订阅选择月时广播的信息
    searchDay:Subscription;//订阅选择日时广播的信息
    // 条件查询参数
    telephone:number;//电话号码
    orderId:any;//订单号
    taoBaoId:string;//淘宝ID
    problemType: number;//问题类型
    helpType: number;//帮助类型
    beginTime: any;//条件查询 --默认开始时间
    endTime: any;//条件查询 --默认结束时间
    myChoose:any;//存放用户选择淘宝ID/订单号/电话号码的选择变量
    id:any;//存放删除记录等操作要用的id
    isSearch:boolean;//标志 是否触发搜索
    isReset:boolean;//标志 是否触发重置
    // 批量编辑
    select_all:boolean;//控制是否全选
    select_one:boolean;//控制当前记录是否勾选
    checked:number[];//存放已勾选的记录id
    isChosen:boolean;//是否勾选 然后控制是否显示批量编辑按钮
    index:number;//搜索匹配下标
    indexList:number[];//临时存放下标的数组
    hasAuthWithAdmin:boolean;//标志是否拥有管理者权限
    authorities:string[];
    images:string[];//存放图片路径数组
    //chart组件相关
    title='查看数据';//调用chart组件所需标题名 比如 查看数据
    onlyFlag=false;//接收配置变量  标识 是否有特殊配置
    isDialog=true;
    onlyDay=true;
    onlyMonth=true;
    onlyYear=true;
    isTrend=false;//没有副标题
    trendArr:ApproverCommonInfo;//存放返回结果
    itemArr=
        {
            '总提交数':0,
            '待处理数':0,
            '已处理数':0,
        };
    // chart组件相关
  constructor(
      private alertService: JhiAlertService,
      private eventManager: JhiEventManager,
      private router: Router,
      private modalService: NgbModal,
      private clfService: MyHttpService,
      private commonMethodsService: CommonMethodsService,
      private principal: Principal,
      private logService: LogService,
  ) {
  }
  ngOnInit() {
      this.principal.identity().then((account) => {
          this.logService.printLog('account',account);
          if(account){
              this.authorities=account.authorities;
              this.logService.printLog(' this.authorities', this.authorities);
              this.principal.hasAuthority('ROLE_ADMIN').then((result) => {
                  if (result) {
                      this.hasAuthWithAdmin = result;
                  }
              });
              this.loadAll();
          }
          else{
              this.router.navigate(['/account/login/1']);
          }
      });
      this.indexList=[];//初始化存放当前选中index数组
      this.checked=[];//初始化存放id数组
      //分页器配置
      this.itemsPerPage = 10;
      this.page = 1;
      this.previousPage = 1;
      this.clfService.resourceUrl=WORKFLOW_CUO_LOU_FA_API;
      this.clfService.resourceUrl_viewData_day=WORKFLOW_CUO_LOU_FA_VIEWDATA_DAY_API;
      this.clfService.resourceUrl_viewData_month=WORKFLOW_CUO_LOU_FA_VIEWDATA_MONTH_API;
      this.clfService.resourceUrl_viewData_year=WORKFLOW_CUO_LOU_FA_VIEWDATA_YEAR_API;
      this.clfService.resourceUrl_search=WORKFLOW_CUO_LOU_FA_SEARCH_BY_API;
      this.clfService.resourceUrl_batch_delete=WORKFLOW_CUO_LOU_FA_BatchDelete_API;
      this. registerChangeInUsers();
      this.chartRequest();
  }
  registerChangeInUsers() {
        this.subInfo=this.eventManager.subscribe('clfListModification', (response) => {
            if(response.content=='clfDeleteInfo'){  // 删除
                this.loadAll();
                alert('删除成功');
            }
            if(response.content=='clfBatchDeleteInfo'){ // 批量删除
                this.select_all=false;
                this.checked=[];
                this.clfService.list=[];
                this.loadAll();
                alert('批量删除成功');
            }
            if(response.content=='clfListEdit'){ // 编辑
                this.loadAll();
                alert('编辑成功');
            }
            if(response.content=='clfListBatch_edit'){// 批量编辑
                this.select_all=false;
                this.checked=[];
                this.clfService.list=[];
                this.loadAll();
                alert('批量编辑成功');
            }
            if(response.content=='clfExportInfo'){// 导出数据
                alert('导出成功');
            }
        });
    }
  chartRequest(){
      // 请求日
      this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
          console.log('response',response);
          if(response.name=='saveDayValue'){
              this.clfService.view_day({
                  startTime:response.content.startTime,
                  endTime:response.content.endTime
              })
                  .subscribe(
                      (res: HttpResponse<ApproverCommonInfo>) =>{
                          console.log('res.body',res.body);
                          this.trendArr=res.body;
                          this.itemArr['总提交数']=this.trendArr["all"];
                          this.itemArr['待处理数']=this.trendArr["not"];
                          this.itemArr['已处理数']=this.trendArr["already"];
                          this.eventManager.broadcast({
                              name: 'saveDayValue_result',
                              content:this.itemArr,
                          });
                          // 暂时先注释
                          // this.chartService.chartData=res.body;
                      },
                      (res: Response) => this.onError(res.json())
                  );
          }
      } );
      // 请求月
      this.searchMonth=this.eventManager.subscribe('saveMonthValue', response => {
          console.log('response',response);
          if(response.name=='saveMonthValue'){
              this.clfService.view_month({
                  dateTime: response.content,
              }).subscribe(
                  (res: HttpResponse<ApproverCommonInfo>) => {
                      this.trendArr=res.body;
                      this.itemArr['总提交数']=this.trendArr["all"];
                      this.itemArr['待处理数']=this.trendArr["not"];
                      this.itemArr['已处理数']=this.trendArr["already"];
                      this.eventManager.broadcast({
                          name: 'saveMonthValue_result',
                          content:this.itemArr,
                      });
                      // 暂时先注释
                      // this.chartService.chartData=res.body;
                  },
                  (res: Response) => this.onError(res.json())
              );
          }
      } );
      // 请求年
      this.searchYear=this.eventManager.subscribe('saveYearValue', response => {
          console.log('response',response);
          if(response.name=='saveYearValue'){
              this.clfService.view_year({
                  dateTime: response.content,
              }).subscribe(
                  (res: HttpResponse<ApproverCommonInfo>) => {
                      this.trendArr=res.body;
                      this.itemArr['总提交数']=this.trendArr["all"];
                      this.itemArr['待处理数']=this.trendArr["not"];
                      this.itemArr['已处理数']=this.trendArr["already"];
                      this.eventManager.broadcast({
                          name: 'saveYearValue_result',
                          content:this.itemArr,
                      });
                      // 暂时先注释
                      // this.chartService.chartData=res.body;
                  },
                  (res: Response) => this.onError(res.json())
              );
          }
      } );
    }
  ngOnDestroy(){
      this.subInfo.unsubscribe();
      this.searchDay.unsubscribe();
      this.searchMonth.unsubscribe();
      this.searchYear.unsubscribe();
  }
    export(){
        const activeModalExport = this.modalService.open(ClfExportComponent, {size: 'lg',container: 'nb-layout'});
    }
    loadAll() {
  // 初始化变量
         //初始化 查询，重置点击开关标识
        this.isSearch=false;
        this.isReset=false;
        //条件查询初始化
        this.telephone=null;//默认电话号码 为空
        this.orderId="";//默认订单号 为空
        this.taoBaoId="";//默认淘宝号 为空
        this.myChoose=0;//默认显示淘宝ID选择
        this.problemType=0;//问题类型 默认显示全部
        this.helpType=0;//帮助类型 默认显示全部
        this.beginTime=this.commonMethodsService.getRangeDate(-5);// 初始化条件查询开始时间
        this.endTime=this.commonMethodsService.getRangeDate(0);// 初始化条件查询结束时间
        //条件查询初始化---end
        //批量编辑
        this.select_all=false;
        this.select_one=false;
        this.isChosen=false;
        this.transition();
    }
    pageSizechange(){
        this.loadAll();
    }
    loadPage(page: number) {
        if (page!== this.previousPage) {
            this.previousPage = page;
        }
        else{
            this.page = 1;
            this.previousPage = 1;
        }
        this.transition();
    }
    transition() {
        this.router.navigate(['/dingding/section/clf-register'], {
            queryParams: {
                page: this.page,
            }
        });
        if (this.isSearch == false) {
            this.sendHttp();
        } else {
            this.search();
        }
    }
    sendHttp(){
      this.isSearch=false;
        // 获取当前请求页面所有数据
        this.clfService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    viewData(){
        const activeModalViewData = this.modalService.open(ClfViewDataComponent, {size: 'lg', container: 'nb-layout'});
        activeModalViewData.componentInstance.title=this.title;//往子组件传参数title
        activeModalViewData.componentInstance.onlyDay=this.onlyDay;//往子组件传参数onlyDay
        activeModalViewData.componentInstance.onlyMonth=this.onlyMonth;//往子组件传参数onlyMonth
        activeModalViewData.componentInstance.onlyYear=this.onlyYear;//往子组件传参数onlyYear
        activeModalViewData.componentInstance.onlyFlag=this.onlyFlag;//往子组件传参数onlyFlag
        activeModalViewData.componentInstance.isDialog=this.isDialog;//往子组件传参数isDialog
        activeModalViewData.componentInstance.isTrend=this.isTrend;//往子组件传参数isTrend
    }
    edit(id) {
        this.clfService.approverCommonId = id;
        const activeModalEdit = this.modalService.open(ClfEditComponent, {size: 'lg', container: 'nb-layout'});
    }
    batch_edit() {
        const activeModalBatchEdit = this.modalService.open(ClfBatchEditComponent, {size: 'lg', container: 'nb-layout'});
    }
    delete(id){
        if (window.confirm('确定删除该条目?')) {
            this.clfService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'clfListModification',
                    content:'clfDeleteInfo',
                });
            });
        }
    }
    batch_delete(){
        if (window.confirm('确定批量删除?')) {
            this.clfService.batch_delete( this.checked).subscribe(
                (response) => {
                this.eventManager.broadcast({
                    name: 'clfListModification',
                    content:'clfBatchDeleteInfo',
                });
            }
            );
        }
    }
    search_taoBaoId(){
        this.clfService.search({
            taoBaoId: this.taoBaoId,
            problemType: Number(this.problemType),
            helpType: Number(this.helpType),
            beginTime: this.beginTime ,
            endTime: this.endTime,
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_orderId(){
        this.clfService.search({
            orderId: this.orderId,
            problemType: Number(this.problemType),
            helpType: Number(this.helpType),
            beginTime: this.beginTime ,
            endTime: this.endTime,
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_telephone(){
        if(isNaN(this.telephone)){//电话号码 定义为数字类型  注意格式或者数据类型判断
            alert('电话号码格式有误！');
            return
        }
        this.clfService.search({
            telephone: Number(this.telephone),
            problemType: Number(this.problemType),
            helpType: Number(this.helpType),
            beginTime: this.beginTime ,
            endTime: this.endTime,
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search() {
        this.isSearch=false;
        if(!this.beginTime){
            alert('请完善开始时间');
            return
        }
        if(!this.endTime){
            alert('请完善结束时间');
            return
        }
        if(this.endTime<this.beginTime){
            alert('结束时间不小于开始时间');
            return
        }
        this.isSearch=true;
        switch (Number(this.myChoose)) {
            case  0:this.search_taoBaoId();break;
            case  1:this.search_orderId();break;
            case  2:this.search_telephone();break;
            default:break;
        }
    }
    reset(){
        //分页器配置
        this.itemsPerPage = 10;
        this.page = 1;
        this.previousPage = 1;
        this.loadAll();
    }
    selectAll(){
      this.select_all=!this.select_all;
      this.checked=[];
      this.indexList=[];
      if(this.select_all){
          this.isChosen=true;
          this.clfInfos.forEach(clf=>{
              this.checked.push(clf.id);
          });
          this.list.forEach((item,i)=>{
              this.list[i].checked=true;
              this.indexList.push(i);
          });
      }
      else{
          this.isChosen=false;
          this.checked=[];
          this.list.forEach((item,i)=>{
                  this.list[i].checked=false;
                  this.indexList=[];
          });
      }
        this.clfService.list= this.checked;
      this.logService.printLog(' this.clfService.list_all', this.clfService.list);
    }
    selectOne(index,id){
          this.list[index].checked=!this.list[index].checked;
          this.logService.printLog('click',this.list[index].checked);
          // 勾选和去勾选相关动作
            if (this.list[index].checked==true) {
                this.indexList.push(index);
                this.checked.push(id);
                this.logService.printLog('this.checked_one_click',this.checked);
            }
            else {
                const i = this.indexList.indexOf(index);
                const idi = this.checked.indexOf(id);
                if(i!=-1){
                    this.indexList.splice(i,1);
                }
                if(idi!=-1){
                    this.checked.splice(idi,1);
                    this.logService.printLog('this.checked_one_click_else',this.checked);
                }
            }
            // 全选是否勾选控制
            if (this.indexList.length == this.itemsPerPage){
                this.select_all=true;
            }
            else {
                this.select_all=false;
            }
            // 批量编辑入口显示关闭控制
            if(this.indexList.length >0){
                    this.isChosen=true;//批量编辑入口显示
            }
            else{
                this.isChosen=false;//批量编辑入口关闭
            }
             this.clfService.list= this.checked;
            this.logService.printLog('  this.clfService.list_one',  this.clfService.list);
    }
    showDetail(id){
        this.clfService.approverCommonId = id;
        const activeModal1ShowDetail = this.modalService.open(ClfDetailComponent, {size: 'lg', container: 'nb-layout'});
    }
    private onSuccess(data,) {
      this.logService.printLog('successData',data);
        this.clfInfos = data.content;
        this.list=this.clfInfos ;
        this.clfInfos.forEach((item,i)=>{
            this.list[i].checked=false;
            if(this.clfInfos[i].image){
                this.clfInfos[i].imageArr= this.clfInfos[i].image.split(',');
                if(this.clfInfos[i].imageArr.length>5){
                    this.clfInfos[i].imageArr.length=5;
                }
            }
        }
            );
        this.logService.printLog('myList',this.list);
        this.totalItems =data.totalPages * 10;
        this.totalElements = data.totalElements;
        this.logService.printLog(' this.clfInfos', this.clfInfos);
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
