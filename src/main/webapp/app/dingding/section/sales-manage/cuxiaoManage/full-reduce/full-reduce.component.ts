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
import {ClfViewDataComponent} from "../../../../../common/chart/chart.component";
import {
    WORKFLOW_REDUCES_LESS_API,
    WORKFLOW_REDUCES_LESS_SEARCH_API,
    WORKFLOW_HOME_BUSINESS_YEAR_TREND_API,
    WORKFLOW_HOME_BUSINESS_MONTH_TREND_API,
    WORKFLOW_HOME_BUSINESS_DAY_TREND_API,
} from '../../../../../app.constants';
import {FullReduceAddComponent} from "./full-reduce-add.component";
import {FullReduceDetailComponent} from "./full-reduce-detail.component";
//调用公共方法类
import {CommonMethodsService} from "../../../../../common/methods/commonMethods.service";
@Component({
  selector: 'full-reduce',
  templateUrl: './full-reduce.component.html',
  styleUrls: ['../../../../../../content/scss/table.scss','../../../../../../content/css/my-appraise.css']
})
export class FullReduceComponent implements OnInit,OnDestroy{
    //操作权限
    hasAuthWithAdmin:boolean;//标志是否拥有管理者权限
    currentAccount: any;
    reduces: ApproverCommonInfo[];
    error: any;
    success: any;
    links: any;
    totalItems: any;
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
    startTime: any;
    endTime: any;
    isSearch:boolean;//标志 是否触发搜索
    searchItem:string;//搜索内容;
    searchItem_breakType=0;
    searchItem_reducePrice:any='';
    searchItem_limitPrice:any='';
    //搜索相关
    searchItem_shopName:any='';
    searchItem_reduceType=0;
    searchItem_startTime:any;
    searchItem_endTime:any;
    searchItem_applicant:any='';
    searchItem_applicantReason:any='';
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
        private reduceService: MyHttpService,
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
        this.searchItem_reduceType=0;
        this.isSearch=false;
        this.array = [];
        this.searchItem_startTime=this.commonMethodsService.getRangeDate(-30);
        this.searchItem_endTime=this.commonMethodsService.getRangeDate(0);
        this.reduceService.resourceUrl=WORKFLOW_REDUCES_LESS_API;
        this.reduceService.resourceUrl_search=WORKFLOW_REDUCES_LESS_SEARCH_API;
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
                this.isSearch=false;//为后面先执行sendHttp
                this.loadAll();
            }
            else{
                this.router.navigate(['/account/login/1']);
            }
        });
        this.registerChangeInUsers();
        this.chartRequest();
    }
    chartRequest(){
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('response',response);
            this.reduceService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_DAY_TREND_API;//默认展示日的数据
            if(response.name=='saveDayValue'){
                this.reduceService.getTrendData({
                    startTime:response.content.startTime,
                    endTime:response.content.endTime,
                    id:151,//满减的模块id
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
            this.reduceService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_MONTH_TREND_API;//展示月的数据
            console.log('response',response);
            if(response.name=='saveMonthValue'){
                this.reduceService.getTrendData({
                    month: response.content,
                    id:151,//满减的模块id
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
            this.reduceService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_YEAR_TREND_API;
            if(response.name=='saveYearValue'){
                this.trendArr=[];
                this.reduceService.getTrendData({
                    year: response.content,
                    id:151,//满减的模块id
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
    ngOnDestroy(){
        this.subs.unsubscribe();
        this.themeSubscription.unsubscribe();
        this.searchDay.unsubscribe();
        this.searchMonth.unsubscribe();
        this.searchYear.unsubscribe();
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
        this.subs=this.eventManager.subscribe('reducesListModification', (response) => {
            if(response.content=='Delete a record'){
                this.loadAll();
                alert('删除成功！');
            }
        });
    }
    reset(){
        // 搜索相关
        this.searchItem_applicantReason='';
        this.searchItem_breakType=0;
        this.searchItem_reducePrice='';
        this.searchItem_limitPrice='';
        this.isSearch=false;
        this.searchItem_shopName='';
        this.searchItem_reduceType=0;
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
        this.reduceService.query({
            page:this.page-1,
            size:this.itemsPerPage,
        })
            .subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        )
    }
    search() {
        if(!this.commonMethodsService.valiNotNegativeInteger(this.searchItem_reducePrice)&&this.searchItem_reducePrice!=''){//正整数正则判断
            alert('满减面额：请输入非负数');
            return
        }
        if(!this.commonMethodsService.valiNotNegativeInteger(this.searchItem_limitPrice)&&this.searchItem_limitPrice!=''){//正整数正则判断
            alert('满减门槛：请输入非负数');
            return
        }
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
        this.reduceService.search({
            shopName: this.searchItem_shopName,
            reducePrice: this.searchItem_reducePrice,
            limitPrice: this.searchItem_limitPrice,
            applyType: this.searchItem_reduceType,
            breakingPrice: this.searchItem_breakType,
            applicant: this.searchItem_applicant,
            applyReason: this.searchItem_applicantReason,
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
        this.router.navigate(['/dingding/section/full-reduce'], {
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
    pageSizechange(){
        this.loadAll();
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
    // 添加新数据
    add() {
        this.reduceService.approverCommonId = null;
        const activeModal = this.modalService.open(FullReduceAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    // 编辑
    edit(id) {
        this.reduceService.approverCommonId = id;
        const activeModal = this.modalService.open(FullReduceAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    // 查看详情
    check(id) {
        this.reduceService.approverCommonId = id;
        const activeModal = this.modalService.open(FullReduceDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.reduceService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'reducesListModification',
                    content: 'Delete a record'
                });
            });
        }
    }
    export() {
        // const activeModal = this.modalService.open(ExportDataFilterComponent, {size: 'lg', container: 'nb-layout'});
        // this.subs = this.eventManager.subscribe('exportDataFilterChooseDone', (response) => {
        //     this.startTime = this.reduceService.startTime;
        //     this.endTime = this.reduceService.endTime;
        //     if (this.startTime && this.endTime) {
        //         this.exportDataTimeBetween();
        //     }
        // })
    }
    exportDataTimeBetween() {
        // this.reduceService.exportDataByTimeBetween({
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
        //             num5: value.priceType == 1 ? '日费用' : '月费用',
        //             num6: value.perPrice,
        //             num7: value.startDate,
        //             num8: value.endDate,
        //             num9: value.isSupportedByFactory == 0 || null ? '否' : '是',
        //             num10: value.perPriceOfSupport,
        //             num11: value.approveInfoDTO.applicant,
        //             num12: value.totalPrice,
        //             num13: value.usedPrice,
        //             num14: value.approveInfoDTO.completeDate,
        //             num15: value.approveInfoDTO.status == 12 ? '已完结' : '已审批',
        //         };
        //         this.array.push(this.data);
        //     }
        // });
        // this.reduceService.exportCsv({
        //     title: ["店铺", "品牌", "商品", "商品ID", "单位类型", "金额/单位", "开始时间", "结束时间", "厂家支持", "厂家支持费用", "申请人", "总费用", "实际结算金额", "实际结束日期", "状态"],
        //     titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num10", "num11", "num12", "num13", "num14", "num15"],
        //     data: this.array
        // }, "直通车.csv");
        // this.subs.unsubscribe();
    }
    private onSuccess(data) {
        this.logService.printLog('data',data);
        if(data){
            this.reduces = data.content;
            this.totalElements = data.totalElements;
            this.totalItems = data.totalPages * 10;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

}

