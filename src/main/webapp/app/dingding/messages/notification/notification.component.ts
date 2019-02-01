import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "./notification.service";
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {Notification} from "./notification.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs";
import {ToasterConfig} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

import {NotificationDetailComponent} from "./notification-detail.component";
import {NotificationPublishComponent} from "./notification-publish.component";
@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['../../../../content/scss/table.scss']

})
export class NotificationComponent implements OnInit, OnDestroy {

    notifications: Notification[];
    currentAccount: any;
    error: any;
    success: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    totalElements:any;
    page: any;
    previousPage: any;
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

    tabStatus: any = 1;

    selectAll: boolean;
    checked: any;

    // 发布新公告
    subPublishNewAnnounceInfo:Subscription;
    // 删除公告
    subDeleteAnnounceInfo:Subscription;
    // 修改公告
    subModifyAnnounceInfo:Subscription;

    constructor(private notificationService: NotificationService,
                private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
    ) {
        this.itemsPerPage = 10;
        this.page=1;
        this.previousPage=1;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.notificationService.notificationLogin=this.currentAccount.login;
            console.log('this.notificationService.notificationLogin',this.notificationService.notificationLogin);
            console.log('this.currentAccount',this.currentAccount);
            this.loadAll();
            this.registerChangeInUsers();
        });
    }

    registerChangeInUsers() {
        // 发布成功提示
        this.subPublishNewAnnounceInfo=this.eventManager.subscribe('notificationListModification', response => {
            if(response.content==200){
                this.loadAll();
                alert('发布成功');
            }
        } );
        // 删除成功提示
        this.subDeleteAnnounceInfo=this.eventManager.subscribe('notificationDeleteInfo', response => {
            if(response.content==200){
                this.loadAll();
                alert('删除成功');
            }
        } );
        // 修改成功提示
        this.subModifyAnnounceInfo=this.eventManager.subscribe('notificationEditInfo', response => {
            if(response.content==200){
                this.loadAll();
                alert('修改成功');
            }
        } );
    }
    ngOnDestroy() {
        this.subPublishNewAnnounceInfo.unsubscribe();
        this.subDeleteAnnounceInfo.unsubscribe();
        this.subModifyAnnounceInfo.unsubscribe();
    }

    loadAll() {
        this.notificationService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(Notification)[]>) => {console.log('res',res);this.onSuccess(res.body)},
            (res: Response) => this.onError(res.json())
        );
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
            this.transition();
        }
    }
    transition() {
        this.selectAll = false;
        this.router.navigate(['/dingding/messages/notification'], {
            queryParams: {
                page: this.page,
            }
        });
        // if (this.isSearch == false) {
        this.loadAll();
        // } else {
        //     this.search();
        // }
    }
    private onSuccess(data) {
        console.log('onSuccess',data);
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.notifications = data.content;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    checkList(tabStatus) {
        this.tabStatus = tabStatus;
    }

    selectM() {
        if (this.selectAll) {
            this.checked = [];
            this.notifications.forEach((i) => {
                i.checked = true;
                this.checked.push(i.id);
            })
        } else {
            this.notifications.forEach((i) => {
                i.checked = false;
                this.checked = [];
            })
        }
    }

    selectN() {
        this.notifications.forEach((i) => {
            const index = this.checked.indexOf(i.id);
            if (i.checked && index === -1) {
                this.checked.push(i.id);
            } else if (!i.checked && index !== -1) {
                this.checked.splice(index, 1);
            }
        });

        if (this.checked.length == 20) {
            this.selectAll = true;
        } else {
            this.selectAll = false;
        }
    }

    deleteSelected() {
        if (window.confirm('确定批量删除系统消息?')) {
            // this.notificationService.batchDelete(this.checked.toString()).subscribe((response) => {
            //     this.eventManager.broadcast({
            //         name: 'notificationListModification',
            //         content: 'Deleted notifications'
            //     });
            // });
        }
    }

    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.notificationService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'notificationDeleteInfo',
                    content:response.status,
                });
            });
        }
    }

    check(id) {
        this.notificationService.notificationId = id;
        const activeModal = this.modalService.open(NotificationDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    edit(id) {
        this.notificationService.notificationId = id;
        const activeModal = this.modalService.open(NotificationPublishComponent, {size: 'lg', container: 'nb-layout'});
    }

    publish() {
        this.notificationService.notificationId = null;
        const activeModal = this.modalService.open(NotificationPublishComponent, {size: 'lg', container: 'nb-layout'});
    }
}
