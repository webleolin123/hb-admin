/**
 * Created by Administrator on 2018/7/23.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {AuthorityService} from "./authority.service";
import {Authority} from "./authority.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthorityAddComponent} from "./authority-add.component";
import {BusinessModule} from "../../authority/business-module/business-module.model";
import {BusinessModuleService} from "../../authority/business-module/business-module.service";
import {AuthorityEditComponent} from "./authority-edit.component";
import {AuthorityDetailComponent} from "./authority-detail.component";
import {Subscription} from "rxjs";
@Component({
    selector: 'ngx-authority',
    templateUrl: './authority.component.html',
    styleUrls: ['../../../../content/scss/table.scss']
})
export class AuthorityComponent implements OnInit, OnDestroy {
    currentAccount: any;
    authorities: Authority[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;

    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;

    modules: BusinessModule[];
    selectedModule: BusinessModule;
    person: string; // 姓名
    businessModuleId: any = 0; // 模块ID
    approvePermissionValue: any=1; // 类型
    brandRange: any = 1; // 品牌范围
    permissionType: any = 5; // 权限
    moduleId: any;
    rolesFomal:Authority[];
    rolesTest:Authority[];
    roleId:number;
    reqData:any;
    subs:Subscription;//订阅广播消息
    subDeleteInfo:Subscription;//订阅广播消息--删除操作
    subEditInfo:Subscription;//订阅广播消息--编辑操作
    subCreateInfo:Subscription;//订阅广播消息--创建操作
    activeIndex:number;
    selectModuleIndex:number;
    selectModuleIndexArr:Array<number>;
    dingName:string;
    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private authorityService: AuthorityService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private businessModuleService: BusinessModuleService) {
            this.itemsPerPage = 7;
            this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = 1;
            this.previousPage = 1;
            this.reqData={};
            this.roleId=2;
            this.rolesTest=[];
            this.rolesFomal=[];
            this.selectModuleIndex=0;
            this.selectModuleIndexArr=[];
            this.activeIndex=1;
            this.dingName='';
            this.modules=[];
            this.authorities=[];
            });
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
    }
    registerChangeInUsers() {
        this.subs=this.eventManager.subscribe('authorityListInfo', (response) => { //删除广播
            if (response.content == 'authorityListDelete') {
                alert('删除成功');
            }
            if (response.content == 'authorityListEdit') {
                alert('编辑成功');
            }
            if (response.content == 'authorityListCreate') {
                alert('创建成功');
                this.activeIndex=1;
                if( this.selectedModule){
                    this.selectedModule.isSelected=false;
                }
            }
            this.loadAll();
        });
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    loadAll() {
        this.selectModuleIndexArr=[];
        this.businessModuleService.getParentOrChildModules({level: 2}).subscribe((response) => {
            this.modules = response.body;
            this.modules.forEach((item,i)=>{
                this.selectModuleIndexArr.push(this.modules[i].id);
            })
            console.log(' this.selectModuleIndexArr', this.selectModuleIndexArr);
            console.log('this.modules',this.modules);
            this.moduleId = this.modules[this.activeIndex-1].id;
            this.authorityService.getPermissionsByModuleId({moduleId: this.moduleId}).subscribe(
                (res: HttpResponse<(Authority)[]>) => {
                    console.log('this.modules+res.body',res.body);
                    this.onSuccess(res.body)},
                (res: Response) => this.onError(res.json())
            );
        });
    }
    selectModuleChange(selectModuleId){
        if(selectModuleId==0){
            this.selectModuleIndex=0;
        }
        else{
            const i= this.selectModuleIndexArr.indexOf(Number(selectModuleId));
            if(i!==-1){
                this.selectModuleIndex=(i+1);
            }
        }
        // if(this.selectModuleIndex>0){
        //     this.selectModuleIndex=this.selectModuleIndex-1
        // }
        console.log('this.selectModuleIndex',this.selectModuleIndex);
    }
    // trackIdentity(index, item: Authority) {
    //     return item.id;
    // }

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
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/dingding/authority/authority-settings'], {
            queryParams: {
                page: this.page,
            }
        });
        this.loadAll();
    }
    private onSuccess(data) {
        console.log('mydata',data);
        this.authorities = data;
        this.rolesTest=[];
        this.rolesFomal=[];
        if(this.authorities){
            this.authorities.forEach((authority,i)=>{
                if(authority.roleId==1){
                    this.rolesTest.push(authority);
                }
                if(authority.roleId==2){
                    this.rolesFomal.push(authority);
                }
            })
        }
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    add() {
        this.authorityService.authorityId = null;
        const activeModal = this.modalService.open(AuthorityAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    edit(id) {
        this.authorityService.authorityId = id;
        const activeModal = this.modalService.open(AuthorityEditComponent, {size: 'lg', container: 'nb-layout'});
    }

    // 查看详情
    check(id,dingPersonDTO) {
        console.log('dingPerson',dingPersonDTO);
        this.authorityService.authorityId = id;
        const activeModal = this.modalService.open(AuthorityDetailComponent, {size: 'lg', container: 'nb-layout'});
        if(dingPersonDTO){
            this.dingName=dingPersonDTO.dingName;
            activeModal.componentInstance.dingName=this.dingName;//往子组件传参数dingName
        }
        console.log('activeModal',activeModal);
    }

    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.authorityService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'authorityListInfo',
                    content:'authorityListDelete',
                });
            });
        }
    }

    loadModuleAuthority(module: BusinessModule,i:number) {
        this.activeIndex=(i+1);
        if (this.selectedModule) {
            console.log('this.selectedModule',this.selectedModule);
            this.selectedModule.isSelected = false;
        }
        this.selectedModule = module;
        module.isSelected = true;
        this.selectedModule.isSelected = true;
        this.getPermissionsByModuleId(module.id);
    }
    getPermissionsByModuleId(id) {
        this.authorityService.getPermissionsByModuleId({
            moduleId: id
        }).subscribe(
            (res: HttpResponse<(Authority)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    // 重置
    reset() {
        this.activeIndex=1;
        if( this.selectedModule){
            this.selectedModule.isSelected=false;
        }
        this.person = null;
        this.businessModuleId = 0;
        this.approvePermissionValue = 1;
        this.brandRange = 1;
        this.permissionType = 5;
        this.roleId=2;
        this.loadAll();
    }

    // 搜索
    search() {
        this.reqData={
            moduleId:!this.businessModuleId? null : this.businessModuleId,
        }
        // if(!this.person){
        //     this.reqData={
        //         // permissionType: this.permissionType == undefined ? null : this.permissionType,
        //         // brandRange: this.brandRange == undefined ? null : this.brandRange,
        //         businessModuleId: this.businessModuleId == undefined ? null : this.businessModuleId,
        //         // approvePermissionValue: this.approvePermissionValue == undefined ? null : this.approvePermissionValue,
        //         // roleId:undefined ? null:this.roleId,
        //     }
        // }
        // else{
        //     this.reqData={
        //         dingPersonId: this.person == undefined ? null : this.person,
        //         permissionType: this.permissionType == undefined ? null : this.permissionType,
        //         brandRange: this.brandRange == undefined ? null : this.brandRange,
        //         businessModuleId: this.businessModuleId == undefined ? null : this.businessModuleId,
        //         approvePermissionValue: this.approvePermissionValue == undefined ? null : this.approvePermissionValue,
        //         roleId:undefined ? null:this.roleId,
        //     }
        // }
        this.authorityService.search( this.reqData).subscribe(
            (res: HttpResponse<(Authority)[]>) =>
            {
                this.activeIndex=this.selectModuleIndex;
                if( this.selectedModule){
                    this.selectedModule.isSelected=false;
                    // if(this.selectModuleIndex==0){
                    //     this.activeIndex=0;
                    // }
                }
                this.onSuccess(res.body);
            },
            (res: Response) => this.onError(res.json())
        );
    }
}
