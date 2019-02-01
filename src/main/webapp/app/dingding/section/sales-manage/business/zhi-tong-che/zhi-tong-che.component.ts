import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {ZhiTongCheAddComponent} from "./zhi-tong-che-add.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ZhiTongCheDetailComponent} from "./zhi-tong-che-detail.component";
import {ExportDataFilterComponent} from "../../../../../common/export-data-filter/export-data-filter.component";
import {Subscription} from "rxjs/Subscription";
//调用公共方法类
import {CommonMethodsService} from "../../../../../common/methods/commonMethods.service";
import {ClfViewDataComponent} from "../../../../../common/chart/chart.component";
import {
    WORKFLOW_ZHI_TONG_CHE_API,
    WORKFLOW_ZHI_TONG_CHE_SEARCH_API,
    WORKFLOW_ZHI_TONG_CHE_DETAIL_API,
    WORKFLOW_ZHI_TONG_CHE_EXPORT_API,
    WORKFLOW_HOME_BUSINESS_YEAR_TREND_API,
    WORKFLOW_HOME_BUSINESS_MONTH_TREND_API,
    WORKFLOW_HOME_BUSINESS_DAY_TREND_API,
} from '../../../../../app.constants';
@Component({
    selector: 'ngx-zhi-tong-che',
    templateUrl: './zhi-tong-che.component.html',
    styleUrls: ['../../../../../../content/scss/table.scss','../../../../../../content/css/my-appraise.css']
})
export class ZhiTongCheComponent implements OnInit, OnDestroy {
    hasAuthWithAdmin:any;
    currentAccount: any;
    zhiTongChes: ApproverCommonInfo;
    error: any;
    success: any;
    links: any;
    totalItems: any;
    totalElements:any;
    queryCount: any;
    itemsPerPage: any;
    //升降序
    predicate:any;
    reverse:any;
    isSort=false;
    sortValue:any;
    sortItemArr=[//排序item条目
        {'name':'id', 'isOrin':true,'isDesc':false,'index':0},
        {'name':'approveInfo.shop.shopName', 'isOrin':true,'isDesc':false,'index':1},
        {'name':'approveInfo.good.brand.brandName', 'isOrin':true,'isDesc':false,'index':2},
        {'name':'approveInfo.good.goodName', 'isOrin':true,'isDesc':false,'index':3},
        {'name':'priceType', 'isOrin':true,'isDesc':false,'index':4},
        {'name':'startDate', 'isOrin':true,'isDesc':false,'index':5},
        {'name':'endDate', 'isOrin':true,'isDesc':false,'index':6},
        {'name':'totalPrice', 'isOrin':true,'isDesc':false,'index':7},
        {'name':'approveInfo.applicant', 'isOrin':true,'isDesc':false,'index':8},
        {'name':'approveInfo.status', 'isOrin':true,'isDesc':false,'index':9},
    ];
    //升降序
    page: any;
    previousPage: any;
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    exportDatas: Array<any>; // 导出excell的数据变量
    array: any;  // 数组容器
    data: any; // 对象容器
    subs: Subscription;
    startTime: any;
    endTime: any;
    //搜索相关
    searchItem_shopName:any='';
    searchItem_brandName:any='';
    searchItem_goodName:any='';
    searchItem_priceType:any;
    searchItem_startTime:any;
    searchItem_endTime:any;
    searchItem_applicant:any='';
    isSearch:boolean;
    authorities:string[];
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
    //chart组件相关
    constructor(
        private principal: Principal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private zhiTongCheService: MyHttpService,
        private themeService: NbThemeService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private commonMethodsService: CommonMethodsService,
    ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.itemsPerPage =15;
        this.page = 1;
        this.previousPage = 1;
        this.isSearch=false;
        // 搜索相关
        this.searchItem_priceType=0;
        this.searchItem_startTime=this.commonMethodsService.getRangeDate(-30);
        this.searchItem_endTime=this.commonMethodsService.getRangeDate(0);
        // 搜索相关
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
        this.array = [];
        this.zhiTongCheService.resourceUrl=WORKFLOW_ZHI_TONG_CHE_API;
        this.zhiTongCheService.resourceUrl_search=WORKFLOW_ZHI_TONG_CHE_SEARCH_API;
        this.zhiTongCheService.exportUrl=WORKFLOW_ZHI_TONG_CHE_EXPORT_API;
        this.chartRequest();
    }
    chartRequest(){
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('response',response);
            this.zhiTongCheService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_DAY_TREND_API;//默认展示日的数据
            if(response.name=='saveDayValue'){
                this.zhiTongCheService.getTrendData({
                    startTime:response.content.startTime,
                    endTime:response.content.endTime,
                    id:173,//直通车的模块id
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
            this.zhiTongCheService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_MONTH_TREND_API;//展示月的数据
            console.log('response',response);
            if(response.name=='saveMonthValue'){
                this.zhiTongCheService.getTrendData({
                    month: response.content,
                    id:173,//直通车的模块id
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
            this.zhiTongCheService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_YEAR_TREND_API;
            if(response.name=='saveYearValue'){
                this.trendArr=[];
                this.zhiTongCheService.getTrendData({
                    year: response.content,
                    id:173,//直通车的模块id
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
        this.isSort=false;
        this.sortItemArr.forEach((item,i)=>{
            this.sortItemArr[i].isOrin=true;//初始化其他item是否触发的状态
            this.sortItemArr[i].isDesc=false;//初始化其他item是否排序的状态
        });
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
        this.subs=this.eventManager.subscribe('zhiTongCheListModification', (response) => {
            if(response.content=='zhiTongCheListDeleteInfo'){  // 删除
                this.loadAll();
                alert('删除成功');
            }
            // if(response.content=='clfBatchDeleteInfo'){ // 批量删除
            //     this.select_all=false;
            //     this.checked=[];
            //     this.clfService.list=[];
            //     this.loadAll();
            //     alert('批量删除成功');
            // }
            // if(response.content=='clfListEdit'){ // 编辑
            //     this.loadAll();
            //     alert('编辑成功');
            // }
            // if(response.content=='clfListBatch_edit'){// 批量编辑
            //     this.select_all=false;
            //     this.checked=[];
            //     this.clfService.list=[];
            //     this.loadAll();
            //     alert('批量编辑成功');
            // }
            // if(response.content=='clfExportInfo'){// 导出数据
            //     if(response.content==200){
            //         alert('导出成功');
            //     }
            // }
        });
    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
        this.subs.unsubscribe();
        this.searchYear.unsubscribe();
        this.searchMonth.unsubscribe();
        this.searchDay.unsubscribe();
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        if(this.isSort){
            this.zhiTongCheService.query({
                page:this.page-1,
                size:this.itemsPerPage,
                sort:this.sortValue,
            }).subscribe(
                (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            )
        }
        else{
            this.zhiTongCheService.query({
                page:this.page-1,
                size:this.itemsPerPage,
            }).subscribe(
                (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            )
        }

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
        if(this.isSort){
            this.zhiTongCheService.search({
                shopName: this.searchItem_shopName,
                brandName: this.searchItem_brandName,
                goodName: this.searchItem_goodName,
                priceType: this.searchItem_priceType,
                applicant: this.searchItem_applicant,
                startTime: this.searchItem_startTime,
                endTime: this.searchItem_endTime,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort:this.sortValue,
            }).subscribe(
                (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
        else{
            this.zhiTongCheService.search({
                shopName: this.searchItem_shopName,
                brandName: this.searchItem_brandName,
                goodName: this.searchItem_goodName,
                priceType: this.searchItem_priceType,
                applicant: this.searchItem_applicant,
                startTime: this.searchItem_startTime,
                endTime: this.searchItem_endTime,
                page: this.page - 1,
                size: this.itemsPerPage,
            }).subscribe(
                (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }
    loadAll() {
        this.router.navigate(['/dingding/section/zhi-tong-che'], {
            queryParams: {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort:this.sortValue,
            }
        });
        if (this.isSearch == false) {
            this.sendHttp();
        } else {
            this.search();
        }
    }
    sort(sortItem) {
        this.isSort=true;
        sortItem.isOrin=false;//复写当前item是否触发的状态
        sortItem.isDesc=!sortItem.isDesc;//复写当前item是否排序的状态
        this.reverse=!sortItem.isDesc?'asc':'desc';
        this.predicate=sortItem.name;
        console.log('sortItem.isDesc',sortItem.isDesc);
        console.log('this.reverse',this.reverse);
        console.log('this.predicate',this.predicate);
        console.log('sortItem',sortItem);
        this.sortValue=[this.predicate + ',' + this.reverse];
        this.loadAll();
        this.sortItemArr.forEach((item,i)=>{
            if(sortItem.index==i){
                this.sortItemArr[i].isOrin=false;//当前item是否触发的状态
                this.sortItemArr[i].isDesc=sortItem.isDesc;//当前item是否排序的状态
            }
            else{
                this.sortItemArr[i].isOrin=true;//初始化其他item是否触发的状态
                this.sortItemArr[i].isDesc=false;//初始化其他item是否排序的状态
            }
        });
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
    private onSuccess(data) {
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.zhiTongChes = data.content;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    // 添加新数据
    add() {
        this.zhiTongCheService.approverCommonId = null;
        const zhiTongCheActiveModal = this.modalService.open(ZhiTongCheAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    // 编辑
    edit(id) {
        this.zhiTongCheService.approverCommonId = id;
        const zhiTongCheActiveModal = this.modalService.open(ZhiTongCheAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    // 查看详情
    check(id) {
        this.zhiTongCheService.approverCommonId = id;
        const zhiTongCheActiveModal = this.modalService.open(ZhiTongCheDetailComponent, {size: 'lg', container: 'nb-layout'});
    }
    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.zhiTongCheService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'zhiTongCheListModification',
                    content: 'zhiTongCheListDeleteInfo'
                });
            });
        }
    }
    export() {
        const zhiTongChezhiTongCheActiveModal = this.modalService.open(ExportDataFilterComponent, {size: 'lg', container: 'nb-layout'});
        this.subs = this.eventManager.subscribe('exportDataFilterChooseDone', (response) => {
            this.startTime = this.zhiTongCheService.startTime;
            this.endTime = this.zhiTongCheService.endTime;
            if (this.startTime && this.endTime) {
                this.exportDataTimeBetween();
            }
        })
    }
    exportDataTimeBetween() {
        this.zhiTongCheService.export({
            startTime: this.startTime,
            endTime: this.endTime,
            size: 999999
        }).subscribe((res: HttpResponse<ApproverCommonInfo[]>) => this.onQueryExportDataSuccess(res.body),
            (res: Response) => this.onError(res.json()));
    }
    private onQueryExportDataSuccess(data) {
        console.log(data);
        this.exportDatas = data.content;
        this.array = [];
        this.exportDatas.forEach((value) => {
            if (value) {
                let goodId;
                if (value.approveInfoDTO.goodBakGoodId) {
                    goodId = value.approveInfoDTO.goodBakGoodId;
                } else {
                    goodId = value.approveInfoDTO.goodGoodId;
                }
                this.data = {
                    num1: value.approveInfoDTO.shopName + '\t',
                    num2: value.approveInfoDTO.brandName + '\t',
                    num3: value.approveInfoDTO.goodName + '\t',
                    num4: goodId + '\t',
                    num5: value.priceType == 1 ? '日费用' : '月费用',
                    num6: value.perPrice,
                    num7: value.startDate,
                    num8: value.endDate,
                    num9: value.isSupportedByFactory == 0 || null ? '否' : '是',
                    num10: value.perPriceOfSupport,
                    num11: value.approveInfoDTO.applicant,
                    num12: value.totalPrice,
                    num13: value.usedPrice,
                    num14: value.approveInfoDTO.completeDate,
                    num15: value.approveInfoDTO.status == 12 ? '已完结' : '已审批',
                };
                this.array.push(this.data);
            }
        });
        this.zhiTongCheService.exportCsv({
            title: ["店铺", "品牌", "商品", "商品ID", "单位类型", "金额/单位", "开始时间", "结束时间", "厂家支持", "厂家支持费用", "申请人", "总费用", "实际结算金额", "实际结束日期", "状态"],
            titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num10", "num11", "num12", "num13", "num14", "num15"],
            data: this.array
        }, "直通车.csv");
        this.subs.unsubscribe();
    }
}
