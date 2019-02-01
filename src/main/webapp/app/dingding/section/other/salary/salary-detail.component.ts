import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs/Subscription";
import 'style-loader!angular2-toaster/toaster.css';
import {
    WORKFLOW_TO_SALARY_KeyCodde_API,
    WORKFLOW_TO_SALARY_Detail_Search_API,
} from '../../../../app.constants';
import {ApproverCommonInfo} from '../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../common/http/myHttp.service';
import {LogService} from "../../../../common/index";//引入自定义log服务 可控制线上/调试模式输出情况
@Component({
    selector: 'ngx-salary-detail',
    templateUrl: './salary-detail.component.html',
    styleUrls: ['../../../../../content/scss/table.scss','../../../../../content/css/detail.css']
})
export class SalaryDetailComponent implements OnInit, OnDestroy {
    subInfo:Subscription;
    isSearch:boolean;//标志 是否触发搜索
    searchContent:string;//搜索内容;当前保存姓名搜索值
    keyCode:any;//保存当前keyCode
    statusValue:number;//要查询的导入状态值
    sendMessageStatusValue:number;//要查询的通知状态值
    salaryInfo: ApproverCommonInfo[];//保存返回结果
    itemsPerPage: any;//每页显示记录数
    totalElements: any;//每页显示记录数
    page: any;//当前页
    previousPage: any;//上一页
    totalItems:any;//总页数
    currentAccount: any;
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
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private themeService: NbThemeService,
        private salaryService: MyHttpService,
        private logService: LogService,
    ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.salaryService.resourceUrl=WORKFLOW_TO_SALARY_KeyCodde_API;
        this.salaryService.resourceUrl_search=WORKFLOW_TO_SALARY_Detail_Search_API;
        this.itemsPerPage = 10;
        this.page = 1;
        this.previousPage = 1;
        this.statusValue=0;
        this.sendMessageStatusValue=0;
        this.searchContent='';
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
        this.keyCode=this.salaryService.approverCommonId;
        this.array = [];
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
        this.subInfo=this.eventManager.subscribe('salaryListModification', (response) => this.loadAll());
    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
        this.subInfo.unsubscribe();
    }
    loadAll(){
        this.router.navigate(['/dingding/section/salary/salary-detail'], {
            queryParams: {
                page: this.page - 1,
                size: this.itemsPerPage,
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
        // 获取当前请求页面所有数据
        this.salaryService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            keyCode:this.keyCode,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        )
    }
    search(){
        this.isSearch=true;
        if(this.searchContent==''){
            this.salaryService.search({
                keyCode:this.keyCode,
                status:this.statusValue,
                sendMessageStatus:this.sendMessageStatusValue,
                page: this.page - 1,
                size: this.itemsPerPage,
            }).subscribe
            (
                (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
        else{
            this.salaryService.search({
                keyCode:this.keyCode,
                name:this.searchContent,
                status:this.statusValue,
                sendMessageStatus:this.sendMessageStatusValue,
                page: this.page - 1,
                size: this.itemsPerPage,
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
            this.salaryInfo = data.content;
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
