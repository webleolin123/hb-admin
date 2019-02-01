import {Component, OnDestroy, OnInit} from '@angular/core';
import {Principal} from "../../../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {SaleService} from "../sales-manage.service";
import {Module} from "../module.model";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../../../../../core/user/user.service";
import {SalesApplyDetailComponent} from "../sales-apply-detail/sales-apply-detail.component";
import * as $ from 'jquery';

@Component({
    selector: 'ngx-sales-apply-list',
    templateUrl: './sales-apply-list.component.html',
    styleUrls: ['../../../../../../../content/scss/table.scss']
})
export class SalesApplyListComponent implements OnInit, OnDestroy {
    currentAccount: any;
    modules: Module[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    totalElements: any;
    page: any;
    previousPage: any;
    searchItem: any;
    status: any = 1;
    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private saleService: SaleService,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService,) {
        this.itemsPerPage = 10;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = 1;
            this.previousPage =1;
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
        $('div.tabs ul li').click(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        })
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('salesApplyListModification', (response) => this.loadAll());
    }

    ngOnDestroy() {
    }

    loadAll() {
    }

    sort() {
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
        this.router.navigate(['/dingding/section/sales-apply-list'], {
            queryParams: {
                page: this.page,
            }
        });
        this.loadAll();
    }

    private onSuccess(data) {
        console.log(data);
        this.modules = data;
        // if(data){
        //     this.totalItems = data.totalPages * 10;
        //     this.totalElements = data.totalElements;
        //     this.modules = data.content;
        // }
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    checkModule() {
        const activeModal = this.modalService.open(SalesApplyDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    search() {
        if(this.searchItem){
            alert('功能开发中...');
        }else{
            alert('搜索内容不能为空！');
        }
    }

}
