import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs/Subscription";
//引入自定义log服务 可控制线上/调试模式输出情况
import {LogService} from "../../../../../common/index";
import {LoadUploadAddComponent} from "./load-upload-add.component";
import {LoadUploadDetailComponent} from "./load-upload-detail.component";
import {
    WORKFLOW_SHELVES_API,
    WORKFLOW_SHELVES_SEARCH_API,
    WORKFLOW_HOME_BUSINESS_YEAR_TREND_API,
    WORKFLOW_HOME_BUSINESS_MONTH_TREND_API,
    WORKFLOW_HOME_BUSINESS_DAY_TREND_API,
} from '../../../../../app.constants';
//调用公共方法类
import {CommonMethodsService} from "../../../../../common/methods/commonMethods.service";
import {ClfViewDataComponent} from "../../../../../common/chart/chart.component";
@Component({
  selector: 'load-upload',
  templateUrl: './load-upload.component.html',
  styleUrls: ['../../../../../../content/scss/table.scss','../../../../../../content/css/my-appraise.css']
})
export class LoadUploadComponent implements OnInit,OnDestroy{
    hasAuthWithAdmin:any;
    currentAccount: any;
    shelves: ApproverCommonInfo[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    totalElements: any;
    page: number;
    previousPage: number;
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    exportDatas: ApproverCommonInfo[]; // 导出excell的数据变量
    array: any;  // 数组容器
    data: any; // 对象容器
    subs: Subscription;
    //搜索相关
    searchItem_shopName:any='';
    searchItem_brandName:any='';
    searchItem_goodName:any='';
    searchItem_priceType:any;
    searchItem_startTime:any;
    searchItem_endTime:any;
    searchItem_applicant:any='';
    isSearch=false;
    startTime: any;
    endTime: any;
    //chart组件相关
    searchDay:Subscription;//订阅选择年时广播的信息
    searchMonth:Subscription;//订阅选择年时广播的信息
    searchYear:Subscription;//订阅选择年时广播的信息
    title='查看数据';
    onlyDay=true;
    onlyMonth=true;
    onlyYear=true;
    onlyFlag=false;
    isDialog=true;
    isTrend=false;
    trendArr:any;//存放返回结果
    itemArr=
        {
            '申请总数':0,
            '待办总数':0,
            '已通过总数':0,
            '已处理总数':0,
            '已撤销总数':0,
            '总申请费用':0,
            '已通过费用':0,
            '实际使用费用':0,
        };
    constructor(
        private principal: Principal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private shelvesService: MyHttpService,
        private themeService: NbThemeService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private logService: LogService,
        private commonMethodsService: CommonMethodsService,
    ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.itemsPerPage = 15;
        this.page = 1;
        this.previousPage = 1;
        this.array = [];
        this.searchItem_priceType=0;
        this.searchItem_startTime=this.commonMethodsService.getRangeDate(-30);
        this.searchItem_endTime=this.commonMethodsService.getRangeDate(0);
        this.shelvesService.resourceUrl=WORKFLOW_SHELVES_API;
        this.shelvesService.resourceUrl_search=WORKFLOW_SHELVES_SEARCH_API;
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            if(account){
                this.currentAccount = account;
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
        this.registerChangeInUsers();
        this.chartRequest();
    }
    ngOnDestroy(){
        this.themeSubscription.unsubscribe();
        this.subs.unsubscribe();
        this.searchDay.unsubscribe();
        this.searchMonth.unsubscribe();
        this.searchYear.unsubscribe();
    }
    chartRequest(){
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('response',response);
            this.shelvesService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_DAY_TREND_API;//默认展示日的数据
            if(response.name=='saveDayValue'){
                this.shelvesService.getTrendData({
                    startTime:response.content.startTime,
                    endTime:response.content.endTime,
                    id:139,//上下架的模块id
                })
                    .subscribe(
                        (res: HttpResponse<ApproverCommonInfo[]>) =>{
                            console.log('res.body',res.body);
                            this.trendArr=res.body;
                            this.itemArr['申请总数']=this.trendArr["totalNumber"];
                            this.itemArr['待办总数']=this.trendArr["toDoNumber"];
                            this.itemArr['已通过总数']=this.trendArr["adoptedNumber"];
                            this.itemArr['已处理总数']=this.trendArr["processedNumber"];
                            this.itemArr['已撤销总数']=this.trendArr["cancelledNumber"];
                            this.itemArr['总申请费用']=this.trendArr["totalApproveFee"];
                            this.itemArr['已通过费用']=this.trendArr["adoptedApproveFee"];
                            this.itemArr['实际使用费用']=this.trendArr["usedApproveFee"];
                            // this.itemArr['商品申请总数']=this.trendArr["totalGoodNumber"];
                            // this.itemArr['人员申请总数']=this.trendArr["totalApplicantNumber"];
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
            this.shelvesService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_MONTH_TREND_API;//展示月的数据
            console.log('response',response);
            if(response.name=='saveMonthValue'){
                this.shelvesService.getTrendData({
                    month: response.content,
                    id:139,//上下架的模块id
                }).subscribe(
                    (res: HttpResponse<ApproverCommonInfo[]>) => {
                        this.trendArr=res.body;
                        this.itemArr['申请总数']=this.trendArr["totalNumber"];
                        this.itemArr['待办总数']=this.trendArr["toDoNumber"];
                        this.itemArr['已通过总数']=this.trendArr["adoptedNumber"];
                        this.itemArr['已处理总数']=this.trendArr["processedNumber"];
                        this.itemArr['已撤销总数']=this.trendArr["cancelledNumber"];
                        this.itemArr['总申请费用']=this.trendArr["totalApproveFee"];
                        this.itemArr['已通过费用']=this.trendArr["adoptedApproveFee"];
                        this.itemArr['实际使用费用']=this.trendArr["usedApproveFee"];
                        // this.itemArr['商品申请总数']=this.trendArr["totalGoodNumber"];
                        // this.itemArr['人员申请总数']=this.trendArr["totalApplicantNumber"];
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
            this.shelvesService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_YEAR_TREND_API;
            if(response.name=='saveYearValue'){
                this.trendArr=[];
                this.shelvesService.getTrendData({
                    year: response.content,
                    id:139,//上下架的模块id
                }).subscribe(
                    (res: HttpResponse<ApproverCommonInfo[]>) => {
                        this.trendArr=res.body;
                        this.itemArr['申请总数']=this.trendArr["totalNumber"];
                        this.itemArr['待办总数']=this.trendArr["toDoNumber"];
                        this.itemArr['已通过总数']=this.trendArr["adoptedNumber"];
                        this.itemArr['已处理总数']=this.trendArr["processedNumber"];
                        this.itemArr['已撤销总数']=this.trendArr["cancelledNumber"];
                        this.itemArr['总申请费用']=this.trendArr["totalApproveFee"];
                        this.itemArr['已通过费用']=this.trendArr["adoptedApproveFee"];
                        this.itemArr['实际使用费用']=this.trendArr["usedApproveFee"];
                        this.eventManager.broadcast({
                            name: 'saveYearValue_result',
                            content:this.itemArr,
                        });
                    },
                    (res: Response) => this.onError(res.json())
                );
            }
        } );
    }
    // 初始化 添加、取消和确认按钮
    init(colors: any) {
        this.settingsBtn = [{
            class: 'btn-hero-primary',
            container: 'primary-container',
            title: 'Primary Button',
            buttonTitle: '添加新数据',
            default: {
                gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
                gradientRight: colors.primary,
            },
            cosmic: {
                gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
                gradientRight: colors.primary,
                bevel: `shade(${colors.primary}, 14%)`,
                shadow: 'rgba (6, 7, 64, 0.5)',
                glow: `adjust-hue(${colors.primary}, 10deg)`,
            },
        }];
    }
    registerChangeInUsers() {
        // 编辑
        this.subs=this.eventManager.subscribe('ShelvesListModification', (response) => {
            if(response.content==200){
                this.loadAll();
                alert('保存成功！');
            }
        });
        // 删除
        this.eventManager.subscribe('ShelvesDeleteInfo', response => {
            if(response.content==200){
                this.loadAll();
                alert('删除成功');
            }
        } );
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
    reset(){
        // 搜索相关
        this.isSearch=false;
        this.searchItem_shopName='';
        this.searchItem_brandName='';
        this.searchItem_goodName='';
        this.searchItem_priceType=0;
        this.searchItem_startTime=this.commonMethodsService.getRangeDate(-30);
        this.searchItem_endTime=this.commonMethodsService.getRangeDate(0);
        this.searchItem_applicant='';
        // 搜索相关
        //分页器配置
        this.itemsPerPage = 15;
        this.page = 1;
        this.previousPage = 1;
        this.loadAll();
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        this.shelvesService.query({
            page:this.page-1,
            size:this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        )
    }
    search() {
        if(!this.searchItem_startTime){
            alert('请完善开始时间');
            return
        }
        if(!this.searchItem_endTime){
            alert('请完善结束时间');
            return
        }
        if(this.searchItem_endTime<this.searchItem_startTime){
            alert('结束时间不小于开始时间');
            return
        }
        this.isSearch=true;
        this.shelvesService.search({
            shopName: this.searchItem_shopName,
            brandName: this.searchItem_brandName,
            goodName: this.searchItem_goodName,
            applyType: this.searchItem_priceType,
            applicant: this.searchItem_applicant,
            startDate: this.searchItem_startTime,
            endDate: this.searchItem_endTime,
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    loadAll() {
        this.router.navigate(['/dingding/section/load-upload'], {
            queryParams: {
                page: this.page - 1,
                size: this.itemsPerPage,
            }
        });
        if (this.isSearch == false) {
            this.sendHttp();
        } else {
            this.search();
        }
    }
    sort() {
        // const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        // if (this.predicate !== 'id') {
        //     result.push('id');
        // }
        // return result;
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
        }
        else{
            this.page = 1;
            this.previousPage = 1;
        }
        this.loadAll();
    }
    pageSizechange(){
        this.loadAll();
    }
    // 添加新数据
    add() {
        this.shelvesService.approverCommonId = null;
        const activeModal = this.modalService.open(LoadUploadAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    // 编辑
    edit(id) {
        this.shelvesService.approverCommonId = id;
        const activeModal = this.modalService.open(LoadUploadAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    // 查看详情
    check(id) {
        this.shelvesService.approverCommonId = id;
        const activeModal = this.modalService.open(LoadUploadDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.shelvesService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'ShelvesDeleteInfo',
                    content: response.status
                });
            });
        }
    }
    export() {
        // const activeModal = this.modalService.open(ExportDataFilterComponent, {size: 'lg', container: 'nb-layout'});
        // this.subs = this.eventManager.subscribe('exportDataFilterChooseDone', (response) => {
        //     this.startTime = this.shelvesService.startTime;
        //     this.endTime = this.shelvesService.endTime;
        //     if (this.startTime && this.endTime) {
        //         this.exportDataTimeBetween();
        //     }
        // })
    }
    exportDataTimeBetween() {
        // this.shelvesService.exportDataByTimeBetween({
        //     startTime: this.startTime,
        //     endTime: this.endTime,
        //     size: 999999
        // }).subscribe((res: HttpResponse<ZhiTongChe[]>) => this.onQueryExportDataSuccess(res.body),
        //     (res: Response) => this.onError(res.json()));
    }
    private onQueryExportDataSuccess(data) {
        // console.log(data);
        // this.exportDatas = data.content;
        // this.array = [];
        // this.exportDatas.forEach((value) => {
        //     if (value) {
        //         let goodId;
        //         if (value.approveInfoDTO.goodBakGoodId) {
        //             goodId = value.approveInfoDTO.goodBakGoodId;
        //         } else {
        //             goodId = value.approveInfoDTO.goodGoodId;
        //         }
        //         this.data = {
        //             num1: value.approveInfoDTO.shopName + '\t',
        //             num2: value.approveInfoDTO.brandName + '\t',
        //             num3: value.approveInfoDTO.goodName + '\t',
        //             num4: goodId + '\t',
        //             num5: value.ShelvesType == 1 ? '日费用' : '月费用',
        //             num6: value.perShelves,
        //             num7: value.startDate,
        //             num8: value.endDate,
        //             num9: value.isSupportedByFactory == 0 || null ? '否' : '是',
        //             num10: value.perShelvesOfSupport,
        //             num11: value.approveInfoDTO.applicant,
        //             num12: value.totalShelves,
        //             num13: value.usedShelves,
        //             num14: value.approveInfoDTO.completeDate,
        //             num15: value.approveInfoDTO.status == 12 ? '已完结' : '已审批',
        //         };
        //         this.array.push(this.data);
        //     }
        // });
        // this.shelvesService.exportCsv({
        //     title: ["店铺", "品牌", "商品", "商品ID", "单位类型", "金额/单位", "开始时间", "结束时间", "厂家支持", "厂家支持费用", "申请人", "总费用", "实际结算金额", "实际结束日期", "状态"],
        //     titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num10", "num11", "num12", "num13", "num14", "num15"],
        //     data: this.array
        // }, "直通车.csv");
        // this.subs.unsubscribe();
    }
    private onSuccess(data) {
        this.logService.printLog('data',data);
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.shelves = data.content;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

}
