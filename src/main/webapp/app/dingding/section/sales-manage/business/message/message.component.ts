import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageAddComponent} from "./message-add.component";
import {MessageDetailComponent} from "./message-detail.component";
import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {Subscription} from "rxjs/Subscription";
import {ClfViewDataComponent} from "../../../../../common/chart/chart.component";
import {
    WORKFLOW_MESSAGE_API,
    WORKFLOW_MESSAGE_SEARCH_API,
    WORKFLOW_HOME_BUSINESS_YEAR_TREND_API,
    WORKFLOW_HOME_BUSINESS_MONTH_TREND_API,
    WORKFLOW_HOME_BUSINESS_DAY_TREND_API,
} from '../../../../../app.constants';
//调用公共方法类
import {CommonMethodsService} from "../../../../../common/methods/commonMethods.service";
@Component({
    selector: 'ngx-message',
    templateUrl: './message.component.html',
    styleUrls: ['../../../../../../content/scss/table.scss','../../../../../../content/css/my-appraise.css']
})
export class MessageComponent implements OnInit, OnDestroy {
    hasAuthWithAdmin:any;
    currentAccount: any;
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    messages: ApproverCommonInfo[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    totalElements: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    array:any;
    //搜索相关
    searchItem_pushCause:any;
    searchItem_shopName:any='';
    searchItem_brandName:any='';
    searchItem_goodName:any='';
    searchItem_priceType:any;
    searchItem_startTime:any;
    searchItem_endTime:any;
    searchItem_applicant:any='';
    isSearch:boolean;
    subs: Subscription;
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
    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private messageService: MyHttpService,
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
        this.itemsPerPage = 15;
        this.page = 1;
        this.previousPage = 1;
        this.array = [];
        this.isSearch=false;
        this.searchItem_priceType=0;
        this.searchItem_pushCause=0;
        this.searchItem_startTime=this.commonMethodsService.getRangeDate(-30);
        this.searchItem_endTime=this.commonMethodsService.getRangeDate(0);
        this.messageService.resourceUrl=WORKFLOW_MESSAGE_API;
        this.messageService.resourceUrl_search=WORKFLOW_MESSAGE_SEARCH_API;
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
            this.messageService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_DAY_TREND_API;//默认展示日的数据
            if(response.name=='saveDayValue'){
                this.messageService.getTrendData({
                    startTime:response.content.startTime,
                    endTime:response.content.endTime,
                    id:143,//短信的模块id
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
            this.messageService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_MONTH_TREND_API;//展示月的数据
            console.log('response',response);
            if(response.name=='saveMonthValue'){
                this.messageService.getTrendData({
                    month: response.content,
                    id:143,//短信的模块id
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
            this.messageService.resourceUrl_getTrend= WORKFLOW_HOME_BUSINESS_YEAR_TREND_API;
            if(response.name=='saveYearValue'){
                this.trendArr=[];
                this.messageService.getTrendData({
                    year: response.content,
                    id:143,//短信的模块id
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
        this.subs=this.eventManager.subscribe('messageListModification', (response) => {
            if(response.content=='messageListDeleteInfo'){  // 删除
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
        this.searchDay.unsubscribe();
        this.searchMonth.unsubscribe();
        this.searchYear.unsubscribe();
    }
    reset(){
        // 搜索相关
        this.isSearch=false;
        this.searchItem_shopName='';
        this.searchItem_brandName='';
        this.searchItem_goodName='';
        this.searchItem_priceType=0;
        this.searchItem_pushCause=0;
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
        this.messageService.query({
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
        this.messageService.search({
            shopName: this.searchItem_shopName,
            brandName: this.searchItem_brandName,
            goodName: this.searchItem_goodName,
            smsType: this.searchItem_priceType,
            pushCause: this.searchItem_pushCause,
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
    loadAll() {
        this.router.navigate(['/dingding/section/message'], {
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
    private onSuccess(data) {
        if(data){
            this.totalItems = data.totalPages * 10;
            this.messages = data.content;
            this.totalElements = data.totalElements;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    add() {
        this.messageService.approverCommonId = null;
        const activeModal = this.modalService.open(MessageAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    // 编辑
    edit(id) {
        this.messageService.approverCommonId = id;
        const activeModal = this.modalService.open(MessageAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    // 查看详情
    check(id) {
        this.messageService.approverCommonId = id;
        const activeModal = this.modalService.open(MessageDetailComponent, {size: 'lg', container: 'nb-layout'});
    }
    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.messageService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'messageListModification',
                    content: 'messageListDeleteInfo'
                });
            });
        }
    }
}
