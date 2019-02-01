import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ApproverCommonInfo} from '../../common/http/approve-common.model';
import {MyHttpService} from '../../common/http/myHttp.service';
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs/Subscription";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ClfViewDataComponent} from "../../common/chart/chart.component";
import {HomeSomeListDetailComponent} from "./home-someList-detail.component";
import {
    WORKFLOW_HOME_BUSINESS_YEAR_TREND_API,
    WORKFLOW_HOME_BUSINESS_MONTH_TREND_API,
    WORKFLOW_HOME_BUSINESS_DAY_TREND_API,
    WORKFLOW_HOME_GOODS_YEAR_TREND_API,
    WORKFLOW_HOME_GOODS_MONTH_TREND_API,
    WORKFLOW_HOME_GOODS_DAY_TREND_API,
    WORKFLOW_HOME_PERSON_YEAR_TREND_API,
    WORKFLOW_HOME_PERSON_MONTH_TREND_API,
    WORKFLOW_HOME_PERSON_DAY_TREND_API,
    WORKFLOW_HOME_BUSINESS_SEARCH_API,
    WORKFLOW_HOME_GOODS_SEARCH_API,
    WORKFLOW_HOME_PERSON_SEARCH_API,
} from '../../app.constants';
@Component({
    selector: 'ngx-home-someList',
    templateUrl: './home-someList.component.html',
    styleUrls: ['../../../content/scss/table.scss','../../../content/css/detail.css']
})
export class HomeSomeListComponent implements OnInit, OnDestroy {
    type:any;
    title:any;
    titleEN:any;
    url:any;
    requiredReq:any;
    currentAccount: any;
    detailList: ApproverCommonInfo;
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    totalElements: any;
    page: any;
    previousPage: any;
    // 按钮主题相关
    themeName = 'default';
    themeSubscription: any;
    settingsBtn: Array<any>;
    exportDatas: Array<any>; // 导出excell的数据变量
    array: any;  // 数组容器
    data: any={}; // 对象容器
    startTime: any;
    endTime: any;
    //搜索相关
    isSearch=false;
    searchItem='';
    searchType=1;
    //搜索相关
    //chart组件相关
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
    chartName:any='';
    chartTitle:any='';
    onlyDay:any=true;
    onlyMonth:any=true;
    onlyYear:any=true;
    onlyFlag:any=false;
    isDialog:any=true;
    isTrend:any=true;
    homeTrendArr=[];
    //chart组件相关
    searchDay:Subscription;//选择年时广播信息
    searchMonth:Subscription;//选择年时广播信息
    searchYear:Subscription;//选择年时广播信息
    constructor(
        private principal: Principal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private homeListService: MyHttpService,
        private themeService: NbThemeService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.itemsPerPage = 10;
        this.page = 1;
        this.previousPage = 1;
        this.activatedRoute.queryParams.subscribe((queryParams:ApproverCommonInfo)=>{
            this.title=queryParams.title;
            this.titleEN=queryParams.titleEN;
            this.url=queryParams.url;
            this.requiredReq=queryParams.requiredReq;
        });
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            if(account){
                this.currentAccount = account;
                this.loadAll();
            }
            else{
                this.router.navigate(['/account/login/1']);
            }
        });
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
    chartRequest(id,type){
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('response',response);
            switch (type) {
                case 'goods': this.homeListService.resourceUrl_getTrend=WORKFLOW_HOME_GOODS_DAY_TREND_API;break;//默认展示日的数据
                case 'person': this.homeListService.resourceUrl_getTrend=WORKFLOW_HOME_PERSON_DAY_TREND_API;break;//默认展示日的数据
                case 'business': this.homeListService.resourceUrl_getTrend=WORKFLOW_HOME_BUSINESS_DAY_TREND_API;break;//默认展示日的数据
                default:break;
            }
            if(response.name=='saveDayValue'){
              if(id){
                this.homeListService.getTrendData({
                    startTime:response.content.startTime,
                    endTime:response.content.endTime,
                    id:id,
                })
                    .subscribe(
                        (res: HttpResponse<ApproverCommonInfo[]>) =>{
                            console.log('res.body',res.body);
                            this.homeTrendArr=res.body;
                            this.itemArr['申请总数']=this.homeTrendArr["totalNumber"];
                            this.itemArr['待办总数']=this.homeTrendArr["toDoNumber"];
                            this.itemArr['已通过总数']=this.homeTrendArr["adoptedNumber"];
                            this.itemArr['已处理总数']=this.homeTrendArr["processedNumber"];
                            this.itemArr['已撤销总数']=this.homeTrendArr["cancelledNumber"];
                            this.itemArr['总申请费用']=this.homeTrendArr["totalApproveFee"];
                            this.itemArr['已通过费用']=this.homeTrendArr["adoptedApproveFee"];
                            this.itemArr['实际使用费用']=this.homeTrendArr["usedApproveFee"];
    //没有的字段不要传 不然会影响到横轴的显示
                            // this.itemArr['商品申请总数']=this.homeTrendArr["totalGoodNumber"];
                            // this.itemArr['人员申请总数']=this.homeTrendArr["totalApplicantNumber"];
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
            }
        } );
        // 请求月
        this.searchMonth=this.eventManager.subscribe('saveMonthValue', response => {
            console.log('response',response);
            switch (type) {
                case 'goods': this.homeListService.resourceUrl_getTrend=WORKFLOW_HOME_GOODS_MONTH_TREND_API;break;//默认展示月的数据
                case 'person': this.homeListService.resourceUrl_getTrend=WORKFLOW_HOME_PERSON_MONTH_TREND_API;break;//默认展示月的数据
                case 'business': this.homeListService.resourceUrl_getTrend=WORKFLOW_HOME_BUSINESS_MONTH_TREND_API;break;//默认展示月的数据
                default:break;
            }
            if(response.name=='saveMonthValue'){
              if(id){
                this.homeListService.getTrendData({
                    month: response.content,
                    id:id,
                }).subscribe(
                    (res: HttpResponse<ApproverCommonInfo[]>) => {
                        this.homeTrendArr=res.body;
                        this.itemArr['申请总数']=this.homeTrendArr["totalNumber"];
                        this.itemArr['待办总数']=this.homeTrendArr["toDoNumber"];
                        this.itemArr['已通过总数']=this.homeTrendArr["adoptedNumber"];
                        this.itemArr['已处理总数']=this.homeTrendArr["processedNumber"];
                        this.itemArr['已撤销总数']=this.homeTrendArr["cancelledNumber"];
                        this.itemArr['总申请费用']=this.homeTrendArr["totalApproveFee"];
                        this.itemArr['已通过费用']=this.homeTrendArr["adoptedApproveFee"];
                        this.itemArr['实际使用费用']=this.homeTrendArr["usedApproveFee"];
//没有的字段不要传 不然会影响到横轴的显示
                        // this.itemArr['商品申请总数']=this.homeTrendArr["totalGoodNumber"];
                        // this.itemArr['人员申请总数']=this.homeTrendArr["totalApplicantNumber"];
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
            }
        } );
        // 请求年
        this.searchYear=this.eventManager.subscribe('saveYearValue', response => {
            console.log('response',response);
            switch (type) {
                case 'goods': this.homeListService.resourceUrl_getTrend=WORKFLOW_HOME_GOODS_YEAR_TREND_API;break;//默认展示年的数据
                case 'person': this.homeListService.resourceUrl_getTrend=WORKFLOW_HOME_PERSON_YEAR_TREND_API;break;//默认展示年的数据
                case 'business': this.homeListService.resourceUrl_getTrend=WORKFLOW_HOME_BUSINESS_YEAR_TREND_API;break;//默认展示年的数据
                default:break;
            }
            if(response.name=='saveYearValue'){
                if(id){
                    this.homeListService.getTrendData({
                        year: response.content,
                        id:id,
                    }).subscribe(
                        (res: HttpResponse<ApproverCommonInfo[]>) => {
                            this.homeTrendArr=res.body;
                            this.itemArr['申请总数']=this.homeTrendArr["totalNumber"];
                            this.itemArr['待办总数']=this.homeTrendArr["toDoNumber"];
                            this.itemArr['已通过总数']=this.homeTrendArr["adoptedNumber"];
                            this.itemArr['已处理总数']=this.homeTrendArr["processedNumber"];
                            this.itemArr['已撤销总数']=this.homeTrendArr["cancelledNumber"];
                            this.itemArr['总申请费用']=this.homeTrendArr["totalApproveFee"];
                            this.itemArr['已通过费用']=this.homeTrendArr["adoptedApproveFee"];
                            this.itemArr['实际使用费用']=this.homeTrendArr["usedApproveFee"];
                            this.eventManager.broadcast({
                                name: 'saveYearValue_result',
                                content:this.itemArr,
                            });
                        },
                        (res: Response) => this.onError(res.json())
                    );
                }
            }
        } );
    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
        // this.searchDay.unsubscribe();
        // this.searchMonth.unsubscribe();
        // this.searchYear.unsubscribe();
    }
    loadAll() {
        if (this.isSearch == false) {
            this.sendHttp();
        } else {
            this.search();
        }
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        this.homeListService.resourceUrl=this.url;
        this.homeListService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            month:this.requiredReq,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
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
    // 初始化 添加、取消和确认按钮
    reset(){
        this.searchType=1;
        this.searchItem='';
        // 搜索相关
        this.isSearch=false;
        // 搜索相关
        //分页器配置
        this.itemsPerPage = 10;
        this.page = 1;
        this.previousPage = 1;
        this.loadAll();
    }
    return(){
        this.router.navigate(['/dingding/home']);
    }
    toTrend(id,type,Name){
        // 初始化数据
        //传给chart的初始化结果
        // chart组件相关
        // this.type=type;
        // this.homeListService.approverCommonId=id;
        // this.chartName=Name;
        // if(this.type=='goods'){
        //     this.chartTitle='商品—趋势';
        // }
        // if(this.type=='person'){
        //     this.chartTitle='人员—趋势';
        // }
        // if(this.type=='business'){
        //     this.chartTitle=Name+'—趋势';
        //     this.isTrend=false;//不显示具体名称
        // }
        this.chartRequest(id,type);//广播，请求数据准备
        switch (type){//显示处理 比如标题 是否显示副标题
            case 'business': this.chartTitle=Name+'—趋势';break;
            case 'goods':this.chartTitle='商品—趋势';break;
            case 'person':this.chartTitle=Name+'—趋势';this.isTrend=false;break;
            default:break;
        }
        //打开要显示的组件，并传参数
        const activeModalViewData = this.modalService.open(ClfViewDataComponent, {size: 'lg', container: 'nb-layout'});
        activeModalViewData.componentInstance.title=this.chartTitle;//往子组件传参数title
        activeModalViewData.componentInstance.onlyDay=this.onlyDay;//往子组件传参数onlyDay
        activeModalViewData.componentInstance.onlyMonth=this.onlyMonth;//往子组件传参数onlyMonth
        activeModalViewData.componentInstance.onlyYear=this.onlyYear;//往子组件传参数onlyYear
        activeModalViewData.componentInstance.onlyFlag=this.onlyFlag;//往子组件传参数onlyFlag
        activeModalViewData.componentInstance.isDialog=this.isDialog;//往子组件传参数isDialog
        activeModalViewData.componentInstance.isTrend=this.isTrend;//往子组件传参数isTrend
        // activeModalViewData.componentInstance.chartName=this.chartName;//往子组件传参数chartName
        activeModalViewData.componentInstance.chartName=Name;//往子组件传参数chartName
    }
    toDetail(id,type,Name){
        this.homeListService.approverCommonId=id;
        this.homeListService.tmp=Name;//使用临时变量保存当前名称
        this.homeListService.searchType=type;//使用临时变量保存当前类型
        this.homeListService.time=this.requiredReq;//使用临时变量保存当前月份
        const activeModal = this.modalService.open(HomeSomeListDetailComponent, {size: 'lg', container: 'nb-layout'});
    }
    search() {
        // if(!this.searchItem_startTime){
        //     alert('请完善开始时间');
        //     return
        // }
        // if(!this.searchItem_endTime){
        //     alert('请完善结束时间');
        //     return
        // }
        // if(this.searchItem_endTime<this.searchItem_startTime){
        //     alert('结束时间不小于开始时间');
        //     return
        // }
        if(this.searchItem==''){
            alert('输入内容不为空');
            return;
        }
        this.isSearch=true;
        switch (this.titleEN){
            case 'business':this.search_business();break;
            case 'goods':this.search_goods();break;
            case 'person':this.search_person();break;
            default:break;
        }
    }
    search_business(){
        this.homeListService.resourceUrl_search=WORKFLOW_HOME_BUSINESS_SEARCH_API;
        this.homeListService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            month:this.requiredReq,
            moduleName:this.searchItem,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_goods(){
        this.homeListService.resourceUrl_search=WORKFLOW_HOME_GOODS_SEARCH_API;
        this.homeListService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            month:this.requiredReq,
            goodName:this.searchItem,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_person(){
        this.homeListService.resourceUrl_search=WORKFLOW_HOME_PERSON_SEARCH_API;
        this.homeListService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            month:this.requiredReq,
            applicant_name:this.searchItem,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    private onSuccess(data) {
        if(data){
            this.totalItems = data.totalPages * 10;
            this.detailList = data.content;
            this.totalElements = data.totalElements;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
}
