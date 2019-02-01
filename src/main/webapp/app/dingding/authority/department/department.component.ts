import {Component, OnDestroy, OnInit} from '@angular/core';
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MyHttpService} from "../../../common/http/myHttp.service";
import {ApproverCommonInfo} from "../../../common/http/approve-common.model";
import {Principal} from "../../../core/auth/principal.service";
import {Subscription} from "rxjs/Subscription";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpResponse} from '@angular/common/http';
import {LogService} from "../../../common/index";//引入自定义log服务 可控制线上/调试模式输出情况
import {
    WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_API,
    WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_SERACH_API,
} from '../../../app.constants';
@Component({
    selector: 'ngx-department',
    templateUrl: './department.component.html',
    styleUrls: ['../../../../content/scss/table.scss','../../../../content/css/detail.css']
})
export class DepartmentComponent implements OnInit,OnDestroy{
    hasAuthWithAdmin:boolean;//标志是否拥有管理者权限
    //广播相关
    departmentSubInfo: Subscription;
    subDeleteInfo: Subscription;
    subBatch_DeleteInfo: Subscription;
    subEditInfo: Subscription;
    subBatch_editInfo: Subscription;
    subExportInfo: Subscription;
    currentAccount: any;
    departmentInfo: ApproverCommonInfo[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    totalElements:any;
    page: any;
    previousPage: any;
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    //查询相关
    isSearch:boolean;//标志 是否触发搜索
    searchItem: any;
    searchType: any = 1;
    constructor(
        private principal: Principal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private departmentService: MyHttpService,
        private themeService: NbThemeService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private logService: LogService,
    ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.departmentService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_API;
        this.itemsPerPage = 10;
        this.page = 1;
        this.previousPage = 1;
        this.departmentInfo=[];//初始化数据容器
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
        this.isSearch=false;
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
        this.departmentSubInfo=this.eventManager.subscribe('departmentSubInfo', (response) => {
            if(response.content==200){
                this.loadAll();
            }
        });
        // 删除
        this.subDeleteInfo=this.eventManager.subscribe('subDeleteInfo', response => {
            if(response.content==200){
                this.loadAll();
                alert('删除成功');
            }
        } );
        // 批量删除
        // this.subBatch_DeleteInfo=this.eventManager.subscribe('subBatch_DeleteInfo', response => {
        //     if(response.content==200){
        //         this.loadAll();
        //         this.select_all=false;
        //         this.checked=[];
        //         this.clfService.list=[];
        //         alert('批量删除成功');
        //     }
        // } );
        // 编辑
        this.subEditInfo=this.eventManager.subscribe('subEditInfo', response => {
            if(response.content==200){
                this.loadAll();
                alert('编辑成功');
            }
        } );
        // 批量编辑
        // this.subBatch_editInfo=this.eventManager.subscribe('clfListBatch_edit', response => {
        //     if(response.content==200){
        //         this.loadAll();
        //         this.select_all=false;
        //         this.checked=[];
        //         this.clfService.list=[];
        //         alert('批量编辑成功');
        //     }
        // } );
        // 导出数据
        this.subExportInfo=this.eventManager.subscribe('subBatch_editInfo', response => {
            if(response.content==200){
                alert('导出成功');
            }
        } );
    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
        this.departmentSubInfo.unsubscribe();
        this.subDeleteInfo.unsubscribe();
        // this.subBatch_DeleteInfo.unsubscribe();
        this.subEditInfo.unsubscribe();
        // this.subBatch_editInfo.unsubscribe();
        this.subExportInfo.unsubscribe();
    }
    loadAll(){
        this.router.navigate(['/dingding/authority/department'], {
            queryParams: {
                page:this.page-1,
                size:this.itemsPerPage,
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
        this.departmentService.query({
            page:this.page-1,
            size:this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        )
    }
    search(){
        if(this.searchItem==''){
            alert('输入内容不为空');
            return;
        }
        this.isSearch=true;
        this.departmentService.resourceUrl_search=WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_SERACH_API;
        this.departmentService.search({
            name:this.searchItem,
            page: this.page - 1,
            size: this.itemsPerPage,
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
        if(data){
            this.departmentInfo = data.content;
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    reset(){
        //分页器配置
        this.itemsPerPage = 10;
        this.page = 1;
        this.previousPage = 1;
        this.isSearch=false;
        this.searchItem='';
        this.searchType=1;
        this.loadAll();
        //重置 不全 需要自己补充
    }
    showDetail(departmentName){
        this.router.navigate(['/dingding/authority/personnel-manage']);
        this.departmentService.tmp=departmentName;
        this.departmentService.searchType=3;//部门在人员管理查询中值为3
    }
    edit(id) {
        // this.departmentService.approverCommonId = id;
        // const perSonnelActiveModalEdit = this.modalService.open(ClfEditComponent, {size: 'lg', container: 'nb-layout'});
    }
    // batch_edit() {
    //     const perSonnelActiveModalBatchEdit = this.modalService.open(ClfBatchEditComponent, {size: 'lg', container: 'nb-layout'});
    // }
    delete(id){
        // if (window.confirm('确定删除该条目?')) {
        //     this.departmentService.delete(id).subscribe((response) => {
        //         this.eventManager.broadcast({
        //             name: 'clfDeleteInfo',
        //             content:response.status,
        //         });
        //     });
        // }
    }
    batch_delete(){
        // if (window.confirm('确定批量删除?')) {
        //     this.departmentService.batch_delete( this.checked).subscribe(
        //         (response) => {
        //             this.eventManager.broadcast({
        //                 name: 'clfBatchDeleteInfo',
        //                 content:response.status,
        //             });
        //         }
        //     );
        // }
    }
}
