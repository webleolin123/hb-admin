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
import {StockTransferAddComponent} from './stock-transfer-add.component';
import {StockTransferDetailComponent} from './stock-transfer-detail.component';
import {ClfViewDataComponent} from "../../../../../common/chart/chart.component";
import {
    WORKFLOW_STOCK_MANAGE_API,
    WORKFLOW_STOCK_MANAGE_SEARCH_API,
    WORKFLOW_HOME_BUSINESS_YEAR_TREND_API,
    WORKFLOW_HOME_BUSINESS_MONTH_TREND_API,
    WORKFLOW_HOME_BUSINESS_DAY_TREND_API,
} from '../../../../../app.constants';
//调用公共方法类
import {CommonMethodsService} from "../../../../../common/methods/commonMethods.service";
@Component({
  selector: 'stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['../../../../../../content/scss/table.scss','../../../../../../content/css/my-appraise.css']
})
export class StockTransferComponent implements OnInit,OnDestroy {
    hasAuthWithAdmin:any;
    currentAccount: any;
    stocks: ApproverCommonInfo[];
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
    startTime: any;
    endTime: any;
    //搜索相关
    searchItem_shopName:any='';
    searchItem_brandName:any='';
    searchItem_goodName:any='';
    searchItem_stockType:any;
    searchItem_startTime:any;
    searchItem_endTime:any;
    searchItem_applicant:any='';
    isSearch=false;
    searchItem_applyReason:any='';
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
        private stockService: MyHttpService,
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
        this.searchItem_stockType=0;
        this.searchItem_startTime=this.commonMethodsService.getRangeDate(-30);
        this.searchItem_endTime=this.commonMethodsService.getRangeDate(0);
        this.stockService.resourceUrl=WORKFLOW_STOCK_MANAGE_API;
        this.stockService.resourceUrl_search=WORKFLOW_STOCK_MANAGE_SEARCH_API;
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
    chartRequest(){
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('response',response);
            this.stockService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_DAY_TREND_API;//默认展示日的数据
            if(response.name=='saveDayValue'){
                this.stockService.getTrendData({
                    startTime:response.content.startTime,
                    endTime:response.content.endTime,
                    id:140,//库存调拨的模块id
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
            this.stockService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_MONTH_TREND_API;//展示月的数据
            console.log('response',response);
            if(response.name=='saveMonthValue'){
                this.stockService.getTrendData({
                    month: response.content,
                    id:140,//库存调拨的模块id
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
            this.stockService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_YEAR_TREND_API;
            if(response.name=='saveYearValue'){
                this.trendArr=[];
                this.stockService.getTrendData({
                    year: response.content,
                    id:140,//库存调拨的模块id
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
        // 编辑
        this.subs=this.eventManager.subscribe('stockListModification', (response) => {
            if(response.content=='stockEditInfo'){
                this.loadAll();
                alert('编辑成功！');
            }
            if(response.content=='stockDeleteInfo'){
                this.loadAll();
                alert('删除成功！');
            }
        });
    }
    reset(){
        // 搜索相关
        this.isSearch=false;
        this.searchItem_shopName='';
        this.searchItem_brandName='';
        this.searchItem_goodName='';
        this.searchItem_stockType=0;
        this.searchItem_startTime=this.commonMethodsService.getRangeDate(-30);
        this.searchItem_endTime=this.commonMethodsService.getRangeDate(0);
        this.searchItem_applicant='';
        this.searchItem_applyReason='';
        // 搜索相关
        //分页器配置
        this.itemsPerPage = 15;
        this.page = 1;
        this.previousPage = 1;
        this.loadAll();
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        this.stockService.query({
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
        this.stockService.search({
            shopName: this.searchItem_shopName,
            brandName: this.searchItem_brandName,
            goodName: this.searchItem_goodName,
            applyType: this.searchItem_stockType,
            applicant: this.searchItem_applicant,
            applyReason: this.searchItem_applyReason,
            startTime: this.searchItem_startTime,
            endTime: this.searchItem_endTime,
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    loadAll() {
        this.router.navigate(['/dingding/section/stock-transfer'], {
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
    // 添加新数据
    add() {
        this.stockService.approverCommonId = null;
        const activeModal = this.modalService.open(StockTransferAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    // 编辑
    edit(id) {
        this.stockService.approverCommonId = id;
        const activeModal = this.modalService.open(StockTransferAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    // 查看详情
    check(id) {
        this.stockService.approverCommonId = id;
        const activeModal = this.modalService.open(StockTransferDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.stockService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'stockListModification',
                    content:'stockDeleteInfo'
                });
            });
        }
    }
    export() {
        // const activeModal = this.modalService.open(ExportDataFilterComponent, {size: 'lg', container: 'nb-layout'});
        // this.subs = this.eventManager.subscribe('exportDataFilterChooseDone', (response) => {
        //     this.startTime = this.stockService.startTime;
        //     this.endTime = this.stockService.endTime;
        //     if (this.startTime && this.endTime) {
        //         this.exportDataTimeBetween();
        //     }
        // })
    }
    exportDataTimeBetween() {
        // this.stockService.export({
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
        //             num5: value.stockType == 1 ? '日费用' : '月费用',
        //             num6: value.perstock,
        //             num7: value.startDate,
        //             num8: value.endDate,
        //             num9: value.isSupportedByFactory == 0 || null ? '否' : '是',
        //             num10: value.perstockOfSupport,
        //             num11: value.approveInfoDTO.applicant,
        //             num12: value.totalstock,
        //             num13: value.usedstock,
        //             num14: value.approveInfoDTO.completeDate,
        //             num15: value.approveInfoDTO.status == 12 ? '已完结' : '已审批',
        //         };
        //         this.array.push(this.data);
        //     }
        // });
        // this.stockService.exportCsv({
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
            this.stocks = data.content;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

}
