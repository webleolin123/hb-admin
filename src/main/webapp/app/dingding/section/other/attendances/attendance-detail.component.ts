import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {NbThemeService} from "@nebular/theme";
import {Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs/Subscription";
import {
    WORKFLOW_TO_Attendance_KeyCodde_API,
    WORKFLOW_TO_Attendance_Detail_Search_API,
} from '../../../../app.constants';
import {ApproverCommonInfo} from '../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../common/http/myHttp.service';
import {LogService} from "../../../../common/index";//引入自定义log服务 可控制线上/调试模式输出情况
@Component({
    selector: 'ngx-attendance-detail',
    templateUrl: './attendance-detail.component.html',
    styleUrls: ['../../../../../content/scss/table.scss','../../../../../content/css/detail.css']
})
export class AttendanceDetailComponent implements OnInit, OnDestroy {
    subInfo:Subscription;//广播接收
    searchContent:string;//搜索内容;当前保存姓名搜索值
    keyCode:any;//保存当前keyCode
    statusValue:number;//要查询的导入状态值
    sendMessageStatusValue:number;//要查询的通知状态值
    attendanceInfo: ApproverCommonInfo[];//保存返回结果
    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    previousPage: any;//上一页
    totalItems:any;//总页数
    totalElements:any;//总页数
    currentAccount: any;
    isSearch:boolean;//标志 是否触发搜索
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    array: any;  // 数组容器
    data: any; // 对象容器
    constructor(
        private principal: Principal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private router: Router,
        private modalService: NgbModal,
        private themeService: NbThemeService,
        private attendanceService: MyHttpService,
        private logService: LogService,
    ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.attendanceService.resourceUrl=WORKFLOW_TO_Attendance_KeyCodde_API;//记录详情请求页面数据的地址
        this.attendanceService.resourceUrl_search=WORKFLOW_TO_Attendance_Detail_Search_API;//记录详情--点击查询请求页面数据的地址
        this.itemsPerPage = 10;//每页显示记录数
        this.page = 1;//初始页码
        this.previousPage = 1;//初始上一页
        this.statusValue=0;//导入状态筛选条件初始值
        this.sendMessageStatusValue=0;//导出状态筛选条件初始值
        this.searchContent='';//输入框搜索初始值
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
        this.registerChangeInUsers();
        this.array = [];
        this.keyCode=this.attendanceService.approverCommonId;
        this.isSearch=false;
    }
    // 初始化 添加、取消和确认按钮
    init(colors: any) {
        this.settingsBtn = [{
            class: 'btn-hero-primary',
            container: 'primary-container',
            title: 'Primary Button',
            buttonTitle: '导出文件',
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
        }, {
            class: 'btn-hero-success',
            container: 'success-container',
            title: 'Success Button',
            buttonTitle: '导入文件',
            default: {
                gradientLeft: `adjust-hue(${colors.success}, 20deg)`,
                gradientRight: colors.success,
            },
            cosmic: {
                gradientLeft: `adjust-hue(${colors.success}, 20deg)`,
                gradientRight: colors.success,
                bevel: `shade(${colors.success}, 14%)`,
                shadow: 'rgba (33, 7, 77, 0.5)',
                glow: `adjust-hue(${colors.success}, 10deg)`,
            },
        }, {
            class: 'btn-hero-secondary',
            container: 'secondary-container',
            title: 'Ghost Button',
            buttonTitle: '取消',
            default: {
                border: '#dadfe6',
            },
            cosmic: {
                border: colors.primary,
                bevel: '#665ebd',
                shadow: 'rgba (33, 7, 77, 0.5)',
                glow: 'rgba (146, 141, 255, 1)',
            },
        }];
    }
    registerChangeInUsers() {
        this.subInfo=this.eventManager.subscribe('attendanceListModification', (response) => this.loadAll());
    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
        this.subInfo.unsubscribe();
    }
    loadAll(){
        this.router.navigate(['/dingding/section/attendance/attendance-detail'], {
            queryParams: {
                page: this.page-1,
                size:this.itemsPerPage,
                keyCode:this.keyCode,
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
        this.attendanceService.query({
            page:this.page-1,
            size:this.itemsPerPage,
            keyCode:this.keyCode,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        )
    }
    search(){
        this.isSearch=true;
        if(this.searchContent==''){
            this.attendanceService.search({
                keyCode:this.keyCode,
                page: this.page - 1,
                size: this.itemsPerPage,
                status:this.statusValue,
                sendMessageStatus:this.sendMessageStatusValue,
            }).subscribe
            (
                (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
        else{
            this.attendanceService.search({
                keyCode:this.keyCode,
                name:this.searchContent,
                page: this.page - 1,
                size: this.itemsPerPage,
                status:this.statusValue,
                sendMessageStatus:this.sendMessageStatusValue,
            }).subscribe
            (
                (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
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
        this.logService.printLog('data',data);
        if(data){
            this.attendanceInfo = data.content;
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
