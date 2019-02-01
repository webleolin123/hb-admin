import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {SaleService} from "./sales-manage.service";
import {Sale} from "./sales-manage.model";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../../../../core/user/user.service";

@Component({
  selector: 'sales-manage',
  templateUrl: './sales-manage.component.html',
  styleUrls: ['../../../../../../content/scss/table.scss']
})
export class SalesManageComponent implements OnInit,OnDestroy {

    currentAccount: any;
    sales: Sale[];
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

    searchItem: any;
    searchType: any = 1;

    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private saleService: SaleService,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService,) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.itemsPerPage = 10;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = 1;
            this.previousPage = 1;
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
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
        this.eventManager.subscribe('salesManageListModification', (response) => this.loadAll());
    }

    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }

    loadAll() {

    }

    sort() {
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/dingding/section/sales-manage'], {
            queryParams: {
                page: this.page,
            }
        });
        this.loadAll();
    }

    private onSuccess(data) {
        console.log(data);
        this.sales = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    reset() {
        this.router.navigate(['dingding/section/sales-apply-list']);
    }

    search() {

    }

    checkSale(id){

    }

}
