import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {UserService} from "../../../core/user/user.service";
import {User} from "../../../core/user/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs/Subscription";
import {UserDialogComponent} from "./user-dialog.component";
@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['../../../../content/scss/table.scss']
})
export class UserComponent implements OnInit,OnDestroy {
    hasAuthWithAdmin:boolean;//标志是否拥有管理者权限
    //广播相关
    userEditInfo: Subscription;
    userCreateInfo: Subscription;
    subDeleteInfo: Subscription;
    currentAccount: any;
    users: User[];
    error: any;
    success: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    totalElements: any;
    page: any;
    previousPage: any;
    searchItem: any;
    isSearch: boolean;
    searchType:any=1;
    constructor(
        private principal: Principal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        ) {
        this.itemsPerPage = 10;
        this.page = 1;
        this.previousPage = 1;
        this.users=[];//初始化数据容器
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
        this.isSearch = false;
    }
    registerChangeInUsers() {
        this.subDeleteInfo=this.eventManager.subscribe('userDeleteInfo', (response) => {
            if(response.content==200){
                this.loadAll();
                alert('删除成功');
            }
          })
        this.userCreateInfo=this.eventManager.subscribe('userCreateInfo', (response) => {
            if(response.content==201){
                this.loadAll();
                alert('创建成功');
            }
          })
        this.userEditInfo=this.eventManager.subscribe('userEditInfo', (response) => {
            if(response.content==200){
                this.loadAll();
                alert('编辑成功');
            }
          })
    }
    ngOnDestroy(){
        this.subDeleteInfo.unsubscribe();
        this.userCreateInfo.unsubscribe();
        this.userEditInfo.unsubscribe();
    }
    loadAll(){
        this.router.navigate(['/systems/system/user'], {
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
        this.userService.query({
            page:this.page-1,
            size:this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(User)[]>) => {
                console.log('res',res);
                this.onSuccess(res.body)},
            (res: Response) => this.onError(res.json())
        )
    }
    search_nickName(){
        this.userService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            nickName:this.searchItem,
        }).subscribe
        (
            (res: HttpResponse<(User)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_phone(){
        this.userService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            phone:this.searchItem,
        }).subscribe
        (
            (res: HttpResponse<(User)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search(){
        if(this.searchItem==''){
            alert('输入内容不为空');
            return;
        }
        this.isSearch=true;
        switch (Number(this.searchType)){
            case 1:this.search_nickName();break;
            case 2:this.search_phone();break;
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
        console.log('data',data);
        if(data){
            if(this.isSearch){//查询结果直接返回结果数组 此处写兼容
                this.users = data;
                if(this.users.length>0){
                    this.totalItems=1;
                }
                else{
                    this.totalItems=0;
                }
            }
            else{
                this.totalItems = data.totalPages * 10;
                // this.totalElements = data.totalElements;
                this.users = data.content;
            }
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
    add() {
        this.userService.login = null;
        const createActiveModal = this.modalService.open(UserDialogComponent, {size: 'lg', container: 'nb-layout'});
    }
    edit(login) {
        this.userService.login = login;
        const editActiveModal = this.modalService.open(UserDialogComponent, {size: 'lg', container: 'nb-layout'});
    }
    delete(login) {
        if (window.confirm('确定删除该条目?')) {
            this.userService.delete(login).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'userDeleteInfo',
                    content:response.status
                });
            });
        }
    }
}
