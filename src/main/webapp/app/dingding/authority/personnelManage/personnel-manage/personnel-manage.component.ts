import {Component, OnDestroy, OnInit} from '@angular/core';
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MyHttpService} from "../../../../common/http/myHttp.service";
import {ApproverCommonInfo} from "../../../../common/http/approve-common.model";
import {Principal} from "../../../../core/auth/principal.service";
import {Subscription} from "rxjs/Subscription";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpResponse} from '@angular/common/http';
import {LogService} from "../../../../common/index";//引入自定义log服务 可控制线上/调试模式输出情况
import {
    WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API,
    WORKFLOW_DINGDING_PERMISSION_PERSONNEL_SEARCH_API,
} from '../../../../app.constants';
import {RolesManageAddRoleComponent} from "../../rolesManage/roles-manage/roles-manage-add-role.component";
import {PersonnelManageDetailComponent} from "../personnel-manage/personnel-manage-detail.component";
import {Department} from "../../../../common/http/department.model";
import {DepartmentUser} from "../../../../common/http/department-user.model";
import {DepartmentService} from "../../../authority/department/department.service";
import {ToasterService, ToasterConfig, Toast, BodyOutputType} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'personnel-manage',
  templateUrl: './personnel-manage.component.html',
  styleUrls: ['../../../../../content/scss/table.scss','../../../../../content/css/detail.css']
})
export class PersonnelManageComponent implements OnInit,OnDestroy {
    //操作权限
    hasAuthWithAdmin:boolean;//标志是否拥有管理者权限
    //广播相关
    personnelSubInfo: Subscription;
    subDeleteInfo: Subscription;
    subBatch_DeleteInfo: Subscription;
    subEditInfo: Subscription;
    subBatch_editInfo: Subscription;
    subExportInfo: Subscription;
    roleAddInfo: Subscription;
    roleRemoveInfo: Subscription;
    currentAccount: any;
    personnelInfo: ApproverCommonInfo[];
    error: any;
    success: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    totalElements: any;
    page: any;
    previousPage: any;
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
    //查询相关
    isSearch:boolean;//标志 是否触发搜索
    searchItem: any='';
    searchType: any =1;//查询选择默认显示姓名 1
    //标志
    isAdd:any=true;
    tmp:any;
    //导出数据相关
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
        private personnelService: MyHttpService,
        private themeService: NbThemeService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private logService: LogService,
        private departmentService: DepartmentService,
        private toasterService: ToasterService,
        ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.itemsPerPage = 10;
        this.page = 1;
        this.previousPage = 1;
        this.personnelService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API;
        this.personnelService.resourceUrl_search=WORKFLOW_DINGDING_PERMISSION_PERSONNEL_SEARCH_API;
        this.personnelInfo=[];
        this.array=[];
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
                this.isSearch=false;
                this.tmp= this.personnelService.tmp;//获取跳转临时条件
                if(this.tmp){//如果有跳转临时条件
                    this.searchType=this.personnelService.searchType;//页面初始化为查询条件--角色
                    this.searchItem=this.tmp;//查询内容 角色名
                    this.isSearch=true;//查询状态
                }
                this.loadAll();
            }
            else{
                this.router.navigate(['/account/login/1']);
            }
        });
        this.registerChangeInUsers();
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
        this.personnelSubInfo=this.eventManager.subscribe('personnelSubInfo', (response) => {
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
        // this.subBatch_editInfo=this.eventManager.subscribe('subBatch_editInfo', response => {
        //     if(response.content==200){
        //         this.loadAll();
        //         this.select_all=false;
        //         this.checked=[];
        //         this.clfService.list=[];
        //         alert('批量编辑成功');
        //     }
        // } );
        // 导出数据
        // this.subExportInfo=this.eventManager.subscribe('subExportInfo', response => {
        //     if(response.content=='OK'){
        //         alert('导出成功');
        //     }
        // } );
        // 添加角色，人员
        this.roleAddInfo=this.eventManager.subscribe('role_person_AddInfo', response => {
            if(response.content==200){
                this.loadAll();
                alert('添加成功');
            }
        } );
        // 删除
        this.roleRemoveInfo=this.eventManager.subscribe('role_person_RemoveInfo', response => {
            if(response.content==200){
                this.loadAll();
                alert('移除成功');
            }
        } );
    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
        this.personnelSubInfo.unsubscribe();
        this.subDeleteInfo.unsubscribe();
        // this.subBatch_DeleteInfo.unsubscribe();
        this.subEditInfo.unsubscribe();
        // this.subBatch_editInfo.unsubscribe();
        // this.subExportInfo.unsubscribe();
        this.roleAddInfo.unsubscribe();
        this.roleRemoveInfo.unsubscribe();
    }
    loadAll(){
        this.router.navigate(['/dingding/authority/personnel-manage'], {
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
        this.personnelService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API;
        // 获取当前请求页面所有数据
        this.personnelService.query({
            page:this.page-1,
            size:this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        )
    }
    search_name(){
        this.personnelService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            name:this.searchItem,
        }).subscribe
        (
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_mobile(){
        this.personnelService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            mobile:this.searchItem,
        }).subscribe
        (
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_department(){
        this.personnelService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            department:this.searchItem,
        }).subscribe
        (
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_roles(){
        this.personnelService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            roles:this.searchItem,
        }).subscribe
        (
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search(){
        if(this.searchItem==''){
            alert('输入内容不为空');
            return;
        }
        //注意加条件
        this.isSearch=true;
        this.personnelService.resourceUrl_search=WORKFLOW_DINGDING_PERMISSION_PERSONNEL_SEARCH_API;
        switch (Number(this.searchType)){
            case 1:this.search_name();break;
            case 2:this.search_mobile();break;
            case 3:this.search_department();break;
            case 4:this.search_roles();break;
            default:break;
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
            this.personnelInfo = data.content;
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    addRole(dingId,isAdd){
        const roleAddActiveModal = this.modalService.open(RolesManageAddRoleComponent, {size: 'lg', container: 'nb-layout'});
        roleAddActiveModal.componentInstance.personnel_dingId=dingId;
        roleAddActiveModal.componentInstance.isAdd=isAdd;
    }
    removeRole(dingId,isAdd){
        const roleRemoveActiveModal = this.modalService.open(RolesManageAddRoleComponent, {size: 'lg', container: 'nb-layout'});
        roleRemoveActiveModal.componentInstance.personnel_dingId=dingId;
        roleRemoveActiveModal.componentInstance.isAdd=isAdd;
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
    showDetail(id){
        this.personnelService.approverCommonId=id;
        const personnelActiveModal = this.modalService.open(PersonnelManageDetailComponent, {size: 'lg', container: 'nb-layout'});
    }
    edit(id) {
        // this.personnelService.approverCommonId = id;
        // const perSonnelActiveModalEdit = this.modalService.open(ClfEditComponent, {size: 'lg', container: 'nb-layout'});
    }
    // batch_edit() {
    //     const perSonnelActiveModalBatchEdit = this.modalService.open(ClfBatchEditComponent, {size: 'lg', container: 'nb-layout'});
    // }
    delete(id){
        // if (window.confirm('确定删除该条目?')) {
        //     this.personnelService.delete(id).subscribe((response) => {
        //         this.eventManager.broadcast({
        //             name: 'clfDeleteInfo',
        //             content:response.status,
        //         });
        //     });
        // }
    }
    batch_delete(){
        // if (window.confirm('确定批量删除?')) {
        //     this.personnelService.batch_delete( this.checked).subscribe(
        //         (response) => {
        //             this.eventManager.broadcast({
        //                 name: 'clfBatchDeleteInfo',
        //                 content:response.status,
        //             });
        //         }
        //     );
        // }
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
        this.personnelService.exportCsv({
            title: ["部门ID", "部门名称", "部门ID", "部门名称", "部门ID", "部门名称", "部门ID", "部门名称", "部门ID", "部门名称", "成员ID", "成员姓名"],
            titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num10", "num11", "num12"],
            data: this.array
        }, "部门及成员.csv");
        // this.eventManager.broadcast({
        //     name: 'subExportInfo',
        //     content:'OK',
        // });
        const toast: Toast = {
            type: 'default',
            title: '导出成功',
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
