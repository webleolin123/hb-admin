import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {NbThemeService} from "@nebular/theme";
import {Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs/Subscription";
import {ToasterService, ToasterConfig, Toast, BodyOutputType} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import {
    BASE_API_URL, WORKFLOW_TO_SALARY_API,
    WORKFLOW_TO_AperationSates_SALARY_API,
    WORKFLOW_TO_SALARY_Search_API,
} from '../../../../app.constants';
import {FileUploader} from "ng2-file-upload";
import {Department} from "../../../../common/http/department.model";
import {DepartmentUser} from "../../../../common/http/department-user.model";
import {DepartmentService} from "../../../authority/department/department.service";
import {ApproverCommonInfo} from '../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../common/http/myHttp.service';
import {LogService} from "../../../../common/index";//引入自定义log服务 可控制线上/调试模式输出情况
@Component({
    selector: 'ngx-salary',
    templateUrl: './salary.component.html',
    styleUrls: ['../../../../../content/scss/table.scss','../../../../../content/css/detail.css']
})
export class SalaryComponent implements OnInit, OnDestroy {
    salarySubInfo:Subscription;
    yearValue:string;//选中年份
    monthValue:string;//选中月份
    yearChoiceArr:Array<any>;//可选择年份（暂时固定范围）
    monthChoiceArr:Array<any>;//可选择月份（固定）
    salaryInfo: ApproverCommonInfo[];//保存返回结果
    itemsPerPage: any;//每页显示记录数
    totalElements: any;//每页显示记录数
    page: any;//当前页
    previousPage: any;//上一页
    totalItems:any;//总页数
    currentAccount: any;
    isSearch:boolean;//标志 是否触发搜索
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    // toast配置
    config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-center',
        timeout: 2000,
        newestOnTop: true,
        tapToDismiss: true,
        preventDuplicates: false,
        animation: 'fade',
        limit: 5,
    });
    uploader: FileUploader;
    exportDatas: Department[]; // 导出excell的数据变量
    departmentUsers: DepartmentUser[]; // 导出excell的数据变量
    array: any;  // 数组容器
    data: any; // 对象容器
    exportUserArray: Department[];  // 数组容器
    countx: any = 0;
    county: any = 0;
    countm: any = 0;
    countn: any = 0;
    constructor(
        private principal: Principal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private router: Router,
        private modalService: NgbModal,
        private themeService: NbThemeService,
        private departmentService: DepartmentService,
        private toasterService: ToasterService,
        private salaryService: MyHttpService,
        private logService: LogService,
    ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            if(account){
                this.currentAccount = account;
                this.uploader= new FileUploader({
                    url: BASE_API_URL + WORKFLOW_TO_SALARY_API,
                    method:'POST',
                    autoUpload:false,
                    headers:[{
                        name:'lastName',value:''+this.currentAccount.lastName
                    }]
                });
                this.loadAll();
            }
            else{
                this.router.navigate(['/account/login/1']);
            }
        });
        this.registerChangeInUsers();
        this.salaryService.resourceUrl=WORKFLOW_TO_AperationSates_SALARY_API;
        this.salaryService.resourceUrl_search=WORKFLOW_TO_SALARY_Search_API;
        this.itemsPerPage = 10;//每页显示记录数
        this.page = 1;//初始页码
        this.previousPage = 1;//初始上一页
        this.yearValue='0';//年份选择初始值
        this.monthValue='0';//月份选择初始值
        this.yearChoiceArr=['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023'];//可选择年份 暂时写死
        this.monthChoiceArr=['01','02','03','04','05','06','07','08','09','10','11','12'];//可选择月份
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
        this.salarySubInfo=this.eventManager.subscribe('salaryListModification', (response) => {
            if(response.content==200){
                this.loadAll();
            }
        });
    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
        this.salarySubInfo.unsubscribe();
    }
    loadAll(){
        this.router.navigate(['/dingding/section/salary'], {
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
    sendHttp(){
        // 获取当前请求页面所有数据
        this.salaryService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search(){
        this.isSearch=true;
        this.salaryService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            year: this.yearValue,
            month: this.monthValue,
        }).subscribe
        (
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
    private onSuccess(data) {
        this.logService.printLog('data',data);
        this.totalItems = data.totalPages * 10;
        this.salaryInfo = data.content;
        this.totalElements = data.totalElements;
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    selectedFileOnChanged() {
        this.uploader.setOptions({
            url: BASE_API_URL + WORKFLOW_TO_SALARY_API,
        });
        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (status == 200) {
                const toast: Toast = {
                    type: 'default',
                    title: '上传成功',
                    timeout: 2000,
                    showCloseButton: true,
                    bodyOutputType: BodyOutputType.TrustedHtml,
                };
                this.toasterService.popAsync(toast);
                this.eventManager.broadcast({
                    name: 'salaryListModification',
                    content:status,
                });
            }
            else {
                alert('上传失败：' + JSON.stringify(response));
            }
        };
        this.uploader.uploadAll();
    }
    showDetail(keyCode){
        this.router.navigate(['/dingding/section/salary/salary-detail']);
        this.salaryService.approverCommonId =keyCode;
    }
    export() {
        this.departmentService.query({size: 9999}).subscribe(
            (res: HttpResponse<Department[]>) => this.onQueryExportDataSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    onQueryExportDataSuccess(data: Department[]) {
        this.exportDatas = data;
        this.exportUserArray = [];
        this.countx = 0;
        this.county = 1;
        this.countn = 0;
        this.countm = 0;
        const toast: Toast = {
            type: 'default',
            title: '导出中...',
            timeout: 2000,
            showCloseButton: true,
            bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
        data.forEach((rootDept: Department, index) => {
            if (rootDept.parentid == 1) { // 一级部门
                this.departmentService.queryDepartmentUser({departmentId: rootDept.id,size: 100}).subscribe((res: HttpResponse<DepartmentUser[]>) => {
                    if (res.body.length != 0) { // 一级部门取user不为空
                        const users = res.body;
                        rootDept.users = [];
                        rootDept.users = rootDept.users.concat(users);
                    }
                });
                this.exportUserArray.push(rootDept);
                this.countx = this.countx + 1;
            }
        });
        this.pushChild(this.exportUserArray);
    }
    pushChild(parents: Department[]) {
        parents.forEach((parent, index) => {
            parent.children = [];
            this.exportDatas.forEach((child: Department) => {
                if (child.parentid == parent.id) {
                    this.countm = this.countm + 1;
                    this.departmentService.queryDepartmentUser({departmentId: child.id,size: 100}).subscribe((res: HttpResponse<DepartmentUser[]>) => {
                        if (res.body.length != 0) { // 一级部门取user不为空
                            const users = res.body;
                            child.users = [];
                            child.users = child.users.concat(users);
                        }
                        this.countn = this.countn + 1;
                        if (this.countm == this.countn) {
                            this.exportUsers4CSV();
                        }
                    });
                    parent.children.push(child);
                    this.countx = this.countx + 1;
                }
            });
            if (this.countx < this.exportDatas.length && parent.children != null && parent.children.length > 0) {
                this.pushChild(parent.children);
                this.county = this.county + 1;
            }
        });
    }
    exportUsers4CSV() {
        console.log(this.county);
        console.log(this.exportUserArray);
        this.exportUserArray.forEach((one) => {
            this.buildUser(one, null, null, null, null, one.users);
            if (one.children != null && one.children.length > 0) {
                one.children.forEach((two) => {
                    this.buildUser(one, two, null, null, null, two.users);
                    if (two.children != null && two.children.length > 0) {
                        two.children.forEach((three) => {
                            this.buildUser(one, two, three, null, null, three.users);
                            if (three.children != null && three.children.length > 0) {
                                three.children.forEach((four) => {
                                    this.buildUser(one, two, three, four, null, four.users);
                                    if (four.children != null && four.children.length > 0) {
                                        four.children.forEach((five) => {
                                            this.buildUser(one, two, three, four, five, five.users);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        this.salaryService.exportCsv({
            title: ["部门ID", "部门名称", "部门ID", "部门名称", "部门ID", "部门名称", "部门ID", "部门名称", "部门ID", "部门名称", "成员ID", "成员姓名"],
            titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num10", "num11", "num12"],
            data: this.array
        }, "部门及成员.csv");
        const toast: Toast = {
            type: 'default',
            title: '导出成功.',
            timeout: 2000,
            showCloseButton: true,
            bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
        this.array = [];
    }
    buildUser(one, two, three, four, five, users) {
        if (users != null && users.length > 0) {
            users.forEach((user) => {
                this.data = {
                    num1: one.id + '\t',
                    num2: one.name,
                    num3: two != null ? two.id + '\t' : '',
                    num4: two != null ? two.name : '',
                    num5: three != null ? three.id + '\t' : '',
                    num6: three != null ? three.name : '',
                    num7: four != null ? four.id + '\t' : '',
                    num8: four != null ? four.name : '',
                    num9: five != null ? five.id + '\t' : '',
                    num10: five != null ? five.name : '',
                    num11: user.userid + '\t',
                    num12: user.name,
                };
                this.array.push(this.data);
            });
        }
    }
}
