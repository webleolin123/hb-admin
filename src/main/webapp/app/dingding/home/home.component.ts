import { AfterViewInit, Component, OnDestroy,OnInit,ElementRef,Renderer2,ViewChild} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ApproverCommonInfo} from '../../common/http/approve-common.model';
import {MyHttpService} from '../../common/http/myHttp.service';
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs/Subscription";
import {LogService} from "../../common/index";//引入自定义log服务 可控制线上/调试模式输出情况
import {
    WORKFLOW_HOME_API,
    WORKFLOW_HOME_YEAR_TREND_API,
    WORKFLOW_HOME_MONTH_TREND_API,
    WORKFLOW_HOME_DAY_TREND_API,
    WORKFLOW_HOME_DETAIL_PERSON_API,//人员分析明细
    WORKFLOW_HOME_DETAIL_BUSINESS_API,//业务分析明细
    WORKFLOW_HOME_DETAIL_GOODS_API,//商品分析明细
    WORKFLOW_HOME_YEAR_TREND_EXPORT_API,//年趋势数据导出
    WORKFLOW_HOME_MONTH_TREND_EXPORT_API,//月趋势导出
    WORKFLOW_HOME_DAY_TREND_EXPORT_API,//日趋势数据导出
} from '../../app.constants';
import {CommonMethodsService} from '../../common/methods/commonMethods.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../../../content/css/my-appraise.css'],
})
export class HomeComponent implements AfterViewInit, OnDestroy,OnInit {
    detailTitle:any='';//跳转明细的标题
    detailUrl:any;//跳转明细请求接口的地址
    titleEN:any;//跳转明细的标题英文名
    @ViewChild('svg1') svgCircle1:ElementRef;
    @ViewChild('svg2') svgCircle2:ElementRef;
    passCount:any=0;//通过数
    passFee:any=0;//通过费用
    total_passCount:any=100;//通过总数
    total_passFee:any=100;//通过总费用
    passCountPercent:any;//通过申请数百分比
    passFeePercent:any;//通过申请费用百分比
    objectKeys:any;
    itemName:any;
    iconArr:any;
    icon_bgArr:any;
    totalApprovalList:any;//总数据概况
    testArr:any;//
    monthlyReportList:any;//月报概况
    yearlyReportList:any;//年报概况
    myResult:any;
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    array: any;  // 数组容器
    data: any; // 对象容器
    summaryOfTotalDataInfo: any; // 对象容器
    monthlyReportInfo: any; // 对象容器
    variousAnalysesInfo: any; // 对象容器
    subs: Subscription;
    //操作权限
    hasAuthWithAdmin:boolean;//标志是否拥有管理者权限
    currentAccount: any;
    monthValue:any;
    nowDay:any;//显示今天日期
    nowMonth:any;//显示当月
    preYear:any;//显示上个月的年
    preMonth:any;//显示上个月
    preDate:any;//上个月 日期
    saveSelectMonth:any;//保存当前选择的月份值2018-08
    saveMonth:any;//保存当前选择的月份比如08
    nowSelectedMonth:any;//显示当前选择的月份
    monthArr=['01','02','03','04','05','06','07','08','09','10','11','12'];// 月份基础值
    tmp:any;
    businessApplicationNumberRanking:any;//本月业务申请数排行
    businessApplicationFeeRanking:any;//本月业务申请费用排行
    numberOfPersonnelApplications:any;//本月人员申请数排行
    numberOfProductApplications:any;//本月商品申请数排行
    //chart
    searchDay:Subscription;//选择年时广播信息
    searchMonth:Subscription;//选择年时广播信息
    searchYear:Subscription;//选择年时广播信息
    starTimeVal='';
    endTimeVal='';
    yearVal='';
    monthVal='';
    reqData:any={};
    exportDatas:any=[];
    exportType:any='day';//用于标识当前下载数据项 比如默认下载日趋势的数据
    // searchMonth:Subscription;//选择月时广播信息
    // searchDay:Subscription;//选择日时广播信息
    title:any='日报趋势图';//chart组件title名
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
            '商品申请总数':0,
            '人员申请总数':0,
        };
    onlyDay=true;
    onlyMonth=true;
    onlyYear=true;
    onlyFlag=false;
    isDialog=false;
    homeTrendArr=[];
    constructor(
        private elementRef: ElementRef,
        private renderer2: Renderer2,
        private homeService: MyHttpService,
        private modalService: NgbModal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private principal: Principal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private themeService: NbThemeService,
        private logService: LogService,
        private commonMethodsService: CommonMethodsService,
        ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.nowDay=this.commonMethodsService.getRangeDate(0);//今天
        this.nowMonth= this.nowDay.split('-')[1];//当前月
        this.preDate=this.commonMethodsService.getPreDate(this.nowDay,0);//上个月 格式2018-10-01
        console.log('this.preDate',this.preDate);
        this.preYear= this.preDate.split('-')[0];//当前月的上一月对应的年
        this.preMonth= this.preDate.split('-')[1];//当前月
        this.nowSelectedMonth=this.preMonth;//默认显示上个月
        this.monthValue= this.preYear+'-'+this.preMonth;//拼接年和月组合的月份
        this.saveSelectMonth=this.monthValue;//默认保存上一个月 格式2018-10
        this.saveMonth=this.preMonth;//默认保存上一个月 格式10
        // 动态拼接格式化月份基础值
        this.monthArr.forEach((monthValue,i)=>{
            this.monthArr[i]=this.preYear+'-'+this.monthArr[i];
        });
        this.homeService.resourceUrl=WORKFLOW_HOME_API;
        this.homeService.resourceUrl_viewData_day=WORKFLOW_HOME_DAY_TREND_API;
        this.homeService.resourceUrl_viewData_month=WORKFLOW_HOME_MONTH_TREND_API;
        this.homeService.resourceUrl_viewData_year=WORKFLOW_HOME_YEAR_TREND_API;
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
    ngOnInit(){
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
        this.array = [];
        this.data = [];
        this.summaryOfTotalDataInfo=[];
        this.monthlyReportInfo=[];
        this.variousAnalysesInfo=[];
        this.businessApplicationNumberRanking=[];
        this.businessApplicationFeeRanking=[];
        this.numberOfPersonnelApplications=[];
        this.numberOfProductApplications=[];
        this.itemName=['总审批概况','总费用概况','总商品概况','总人员概况',];
        // this.iconArr=[
        //     '../../../content/images/total_approval.png',
        //     '../../../content/images/total_fee.png',
        //     '../../../content/images/total_product.png',
        //     '../../../content/images/total_person.png',];
        this.iconArr=[
            '../../../content/images/icon_gou.png',
            '../../../content/images/icon_money.png',
            '../../../content/images/icon_bag.png',
            '../../../content/images/icon_person.png',];
        this.icon_bgArr=[
            '../../../content/images/bgBlue.png',
            '../../../content/images/bgYellow.png',
            '../../../content/images/bgGreen.png',
            '../../../content/images/bgRed.png',];
        this.objectKeys= Object.keys;//遍历出对象的key
        //总数据概况
        this.totalApprovalList= [
            {
                '总申请总数':0,
                '待办总数':0,
                '已通过总数':0,
            },
            {
                '总申请费用':0,
                '已通过费用':0,
                '实际使用费用':0,
            },
            {
                '商品申请总数':0,
                '已通过商品总数':0,
            },
            {
                '人员申请总数':0,
            },
        ];
        //年趋势
        this.yearlyReportList=[];
        //传给chart的初始化结果
        this.myResult={
            'all':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,},
            'already':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,},
            'not':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,}
        };
        //月报概况
        this.monthlyReportList= [
            {
                '申请总数':0,
                '待办总数':0,
                '已通过总数':0,
                '已处理总数':0,
                '已撤销总数':0,
            },
            {
                '总申请费用':0,
                '已通过费用':0,
                '实际使用费用':0,
            },
            {
                '商品申请总数':0,
                '已通过商品数':0,
            },
            {
                '人员申请总数':0,
            },
        ];
        this.testArr=this.totalApprovalList;
        this.totalApprovalList.forEach((item,i)=>{
            this.testArr[i].itemName=this.itemName[i];
            this.testArr[i].icon=this.iconArr[i];
            this.testArr[i].icon_bg=this.icon_bgArr[i];
        });
        this.monthlyReportList.forEach((item,i)=>{
            this.monthlyReportList[i].itemName=this.itemName[i];
        });
        console.log(' this.totalApprovalList', this.totalApprovalList);
        console.log(' this.testArr', this.testArr);
        console.log(' this.monthlyReportList', this.monthlyReportList);
        this.registerChangeInUsers();
        this.chartRequest();
    }
    registerChangeInUsers() {
        this.subs=this.eventManager.subscribe('homeInfo', (response) => {
            if(response.content=='badSelect'){
                this.monthValue=this.saveSelectMonth;//操作之前的值//无效 等待解决方案或者不用alert 使用其他提示框比如sweetAlert加promise执行确定或取消后的效果 //或者用广播
                this.nowSelectedMonth=this.saveMonth;//操作之前的值//无效 等待解决方案或者不用alert 使用其他提示框比如sweetAlert加promise执行确定或取消后的效果
            }
            if(response.content=='exportSuccess'){
                alert('导出成功');
            }
        });
    }
    export(){
        if(this.exportType=='day'){
            this.reqData={
                startTime: this.starTimeVal,
                endTime: this.endTimeVal,
            };
        }
        if(this.exportType=='month'){
            this.reqData={
                month: this.monthVal,
            };
        }
        if(this.exportType=='year'){
            this.reqData={
                year: this.yearVal,
            };
        }
        this.homeService.export(this.reqData)
            .subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => {this.onExportSuccess(res);},
            (res: Response) => this.onError(res.json())
            );
    }
    private onExportSuccess(res) {
        this.onQueryExportDataSuccess(res.body)
        console.log(res);
        this.eventManager.broadcast({name: 'homeInfo', content:'exportSuccess'});
    }
    private onQueryExportDataSuccess(data) {
        console.log('exportDatas', data);
        this.exportDatas = data;
        // 注意一定要初始化 this.array
        this.array = [];
        this.exportDatas.forEach((value, index, array) => {
            this.data = {
                num1: this.commonMethodsService.myFilter('statisticsDate',value.statisticsDate),//统计日期
                num2: value.totalNumber ,//申请总数
                num3: value.toDoNumber ,//待办总数
                num4: value.adoptedNumber ,//已通过总数
                num5: value.processedNumber ,//已处理总数
                num6: value.cancelledNumber ,//已撤销总数
                num7: value.totalApproveFee  ,//总申请费用
                num8: value.adoptedApproveFee ,//已通过费用
                num9: value.usedApproveFee  ,//实际使用费用
                num10: value.totalNumberOfGood  ,//商品申请总数
                num11: value.totalNumberOfApplicant ,//人员申请总数
                // num6: this.commonMethodsService.myFilter('helpType', value.helpType),
                // num7: value.problemInstruction,
                // num8: this.commonMethodsService.myFilter('createdDate', value.createdDate),
                // num9: this.commonMethodsService.myFilter('status', value.status),
                // num10: this.commonMethodsService.myFilter('actionType', value.actionType),
                // num11: value.remarks,
                // num12: value.treatment,
                // num13: this.commonMethodsService.myFilter('image', value.image),
            };
            this.array.push(this.data);
        });
        this.commonMethodsService.exportCsv({
            title: ["统计日期", "申请总数", "待办总数", "已通过总数", '已处理总数', "已撤销总数", "总申请费用(单位：元)", "已通过费用(单位：元)", "实际使用费用(单位：元)", "商品申请总数", "人员申请总数"],
            titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num10", "num11"],
            data: this.array
        }, this.title+".csv");
    }
    chartRequest(){
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('response',response);
            this.title='日报趋势图';
            this.exportType='day';
            this.homeService.resourceUrl_getTrend=WORKFLOW_HOME_DAY_TREND_API;
            this.homeService.exportUrl=WORKFLOW_HOME_DAY_TREND_EXPORT_API;
            if(response.name=='saveDayValue'){
                this.starTimeVal=response.content.startTime;
                this.endTimeVal=response.content.endTime;
                this.homeService.getTrendData({
                    startTime:this.starTimeVal,
                    endTime: this.endTimeVal,
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
                            this.itemArr['商品申请总数']=this.homeTrendArr["totalGoodNumber"];
                            this.itemArr['人员申请总数']=this.homeTrendArr["totalApplicantNumber"];
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
            this.title='月报趋势图';
            this.exportType='month';
            this.homeService.resourceUrl_getTrend=WORKFLOW_HOME_MONTH_TREND_API;
            this.homeService.exportUrl=WORKFLOW_HOME_MONTH_TREND_EXPORT_API;
            console.log('response',response);
            if(response.name=='saveMonthValue'){
                this.monthVal=response.content;
                this.homeService.getTrendData({
                    month:this.monthVal,
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
                        this.itemArr['商品申请总数']=this.homeTrendArr["totalGoodNumber"];
                        this.itemArr['人员申请总数']=this.homeTrendArr["totalApplicantNumber"];
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
            this.title='年报趋势图';
            this.exportType='year';
            this.homeService.resourceUrl_getTrend=WORKFLOW_HOME_YEAR_TREND_API;
            this.homeService.exportUrl=WORKFLOW_HOME_YEAR_TREND_EXPORT_API;
            console.log('response',response);
            if(response.name=='saveYearValue'){
                this.yearVal=response.content;
                this.homeService.getTrendData({
                    year:this.yearVal,
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
                        this.itemArr['商品申请总数']=this.homeTrendArr["totalGoodNumber"];
                        this.itemArr['人员申请总数']=this.homeTrendArr["totalApplicantNumber"];
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
    loadAll() {
        // 获取当前请求页面所有数据
        this.homeService.query({
            month:this.monthValue,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        )
    }
    monthChange(selectMonth:string){
        this.nowSelectedMonth=selectMonth.split('-')[1];//当前选择月份
        if(selectMonth>=this.nowMonth){//当前选择月份如果大于等于当前月 弹窗提示
            this.eventManager.broadcast({
                name: 'homeInfo',
                content:'badSelect',
            });
            alert('所选月份数据统计未完成，请选择其他月份继续查看');
            return;
        }
        this.saveSelectMonth=selectMonth;
        this.saveMonth=this.nowSelectedMonth;
        this.loadAll();
    }
    showDetail(item){
        if(item=='person'){
            this.detailTitle='人员明细';
            this.titleEN='person';
            this.detailUrl=WORKFLOW_HOME_DETAIL_PERSON_API;
        }
        if(item=='business'){
            this.detailTitle='业务明细';
            this.titleEN='business';
            this.detailUrl=WORKFLOW_HOME_DETAIL_BUSINESS_API;
        }
        if(item=='goods'){
            this.detailTitle='商品明细';
            this.titleEN='goods';
            this.detailUrl=WORKFLOW_HOME_DETAIL_GOODS_API;
        }
        this.router.navigate(['/dingding/home-someList'], {
            queryParams: {
                title: this.detailTitle,
                titleEN: this.titleEN,
                url:this.detailUrl,
                requiredReq:this.monthValue,
            }
        });
    }
    private onSuccess(data) {
        this.logService.printLog('data',data);
        if(data){
            this.data = data;
            this.summaryOfTotalDataInfo=this.data[0];
            this.monthlyReportInfo=this.data[1];
            this.variousAnalysesInfo=this.data[2];
            if(!this.summaryOfTotalDataInfo||!this.monthlyReportInfo||!this.variousAnalysesInfo){
                this.eventManager.broadcast({
                    name: 'homeInfo',
                    content:'badSelect',
                });
                alert('当前月份数据不完整，请选择其他月份继续查看');
                return;
            }
            this.businessApplicationNumberRanking= this.variousAnalysesInfo.businessApplicationNumberRanking;
            this.businessApplicationFeeRanking= this.variousAnalysesInfo.businessApplicationFeeRanking;
            this.numberOfPersonnelApplications= this.variousAnalysesInfo.numberOfPersonnelApplications;
            this.numberOfProductApplications= this.variousAnalysesInfo.numberOfProductApplications;
            //总数据概况
            this.totalApprovalList= [
                {
                    '总申请总数': this.summaryOfTotalDataInfo['totalNumberOfApplications'],
                    '待办总数': this.summaryOfTotalDataInfo['totalNumberOfPendingApplications'],
                    '已通过总数':this.summaryOfTotalDataInfo['totalNumberOfApplicationsApproved'],
                },
                {
                    '总申请费用':this.summaryOfTotalDataInfo['totalApplicationFee'],
                    '已通过费用':this.summaryOfTotalDataInfo['passedFee'],
                    '实际使用费用':this.summaryOfTotalDataInfo['actualUsageFee'],
                },
                {
                    '商品申请总数':this.summaryOfTotalDataInfo['totalNumberOfProductApplications'],
                    '已通过商品总数':this.summaryOfTotalDataInfo['totalNumberOfGoodsPassed'],
                },
                {
                    '人员申请总数': this.summaryOfTotalDataInfo['totalNumberOfApplicants'],
                },
            ];
            //月报概况
            if(this.monthlyReportInfo['overViewThisMonth'][0]){
                this.monthlyReportList= [
                    {
                        '申请总数':this.monthlyReportInfo['overViewThisMonth'][0].totalNumber+','+this.monthlyReportInfo['statisticsPersent'].totalNumberPersent,
                        '待办总数':this.monthlyReportInfo['overViewThisMonth'][0].toDoNumber+','+this.monthlyReportInfo['statisticsPersent'].toDoNumberPersent,
                        '已通过总数':this.monthlyReportInfo['overViewThisMonth'][0].adoptedNumber+','+this.monthlyReportInfo['statisticsPersent'].adoptedNumberPersent,
                        '已处理总数':this.monthlyReportInfo['overViewThisMonth'][0].processedNumber+','+this.monthlyReportInfo['statisticsPersent'].processedNumberPersent,
                        '已撤销总数':this.monthlyReportInfo['overViewThisMonth'][0].cancelledNumber+','+this.monthlyReportInfo['statisticsPersent'].cancelledNumberPersent,
                    },
                    {
                        '总申请费用':this.monthlyReportInfo['overViewThisMonth'][0].totalApproveFee +','+this.monthlyReportInfo['statisticsPersent'].totalApproveFeePersent,
                        '已通过费用':this.monthlyReportInfo['overViewThisMonth'][0].adoptedApproveFee+','+this.monthlyReportInfo['statisticsPersent'].adoptedApproveFeePersent ,
                        '实际使用费用':this.monthlyReportInfo['overViewThisMonth'][0].usedApproveFee+','+this.monthlyReportInfo['statisticsPersent'].usedApproveFeePersent,
                    },
                    {
                        '商品申请总数':this.monthlyReportInfo['overViewThisMonth'][0].totalNumberOfGood+','+this.monthlyReportInfo['statisticsPersent'].totalNumberOfGoodPersent,
                        '已通过商品数':this.monthlyReportInfo['overViewThisMonth'][0].adoptedNumberOfGood+','+this.monthlyReportInfo['statisticsPersent'].adoptedNumberOfGoodPersent,
                    },
                    {
                        '人员申请总数':this.monthlyReportInfo['overViewThisMonth'][0].totalNumberOfApplicant+',' +
                            this.monthlyReportInfo['statisticsPersent'].totalNumberOfApplicantPersent,
                    },
                ];
                console.log('拼接this.monthlyReportList',this.monthlyReportList);
            }
    //通过概率 区域内容
            //申请数
            if(this.monthlyReportInfo['overViewThisMonth'][0]){
                this.passCount=this.monthlyReportInfo['overViewThisMonth'][0].adoptedNumber;
                this.total_passCount=this.monthlyReportInfo['overViewThisMonth'][0].totalNumber;
                this.passCountPercent=this.commonMethodsService.accDiv(this.passCount,this.total_passCount);
                //申请费用
                this.passFee=this.monthlyReportInfo['overViewThisMonth'][0].adoptedApproveFee;
                this.total_passFee=this.monthlyReportInfo['overViewThisMonth'][0].totalApproveFee;
                this.passFeePercent=this.commonMethodsService.accDiv(this.passFee,this.total_passFee);
            }
            const circleRadius=50;
            const circleLength=Math.floor(2 * Math.PI * circleRadius);
            this.renderer2.setAttribute(this.svgCircle1.nativeElement, 'stroke-dasharray', ''+this.commonMethodsService.accMul(circleLength,this.passCountPercent)+',10000');
            this.renderer2.setAttribute(this.svgCircle2.nativeElement, 'stroke-dasharray', ''+this.commonMethodsService.accMul(circleLength,this.passFeePercent)+',10000');
            this.testArr=this.totalApprovalList;
            this.totalApprovalList.forEach((item,i)=>{
                this.testArr[i].itemName=this.itemName[i];
                this.testArr[i].icon=this.iconArr[i];
                this.testArr[i].icon_bg=this.icon_bgArr[i];
            });
            this.monthlyReportList.forEach((item,i)=>{
                this.monthlyReportList[i].itemName=this.itemName[i];
            });
            console.log(' this.summaryOfTotalDataInfo', this.summaryOfTotalDataInfo);
            console.log(' this.monthlyReportInfo', this.monthlyReportInfo);
            console.log(' this.variousAnalysesInfo', this.variousAnalysesInfo);
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    ngAfterViewInit() {
    }
    ngOnDestroy(){
        this.themeSubscription.unsubscribe();
        this.subs.unsubscribe();
        //chart
        //取消广播订阅
        this.searchDay.unsubscribe();
        this.searchMonth.unsubscribe();
        this.searchYear.unsubscribe();
        //chart
    }
}
