/**
 * Created by yl on 2018/4/17.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ShopService} from "./shop.service";
import {Shop} from "./shop.model";
import {ShopAddComponent} from './shop-add.component'
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../../../core/user/user.service";
@Component({
    selector: 'ngx-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['../../../../../content/scss/table.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
    currentAccount: any;
    shops: Shop[];
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
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;

    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private shopService: ShopService,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService) {
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

    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
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
        this.eventManager.subscribe('shopListModification', (response) => this.loadAll());
    }

    loadAll() {
        this.shopService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(Shop)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }

    trackIdentity(index, item: Shop) {
        return item.id;
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
        this.router.navigate(['/dingding/section/shop'], {
            queryParams: {
                page: this.page,
            }
        });
        this.loadAll();
    }
    private onSuccess(data) {
        console.log('data',data);
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.shops = data.content;
        }
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    add() {
        this.shopService.shopId = null;
        const activeModal = this.modalService.open(ShopAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    checkGood(id) {
        this.userService.shopId = id;
        this.userService.brandId = null;
        this.router.navigate(['/dingding/section/good']);
    }

    edit(id) {
        this.shopService.shopId = id;
        const activeModal = this.modalService.open(ShopAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.shopService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'shopListModification',
                    content: 'Deleted a shop'
                });
            });
        }
    }
}
