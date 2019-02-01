/**
 * Created by yl on 2018/4/17.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {GoodSkuService} from "./good-sku.service";
import {GoodSku} from "./good-sku.model";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BrandService} from "../brand/brand.service";
import {ShopService} from "../shop/shop.service";
import {GoodService} from '../good/good.service';
import {Shop} from "../shop/shop.model";
import {Brand} from "../shop/brand.model";
import {Good} from "../good/good.model";
import {GoodSkuAddComponent} from "./good-sku-add.component";
import {GoodSkuDetailComponent} from "./good-sku-detail.component";
@Component({
    selector: 'ngx-good-sku',
    templateUrl: './good-sku.component.html',
    styleUrls: ['../../../../../content/scss/table.scss']
})
export class GoodSkuComponent implements OnInit, OnDestroy {
    currentAccount: any;
    goodSkus: GoodSku[];
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

    brands: Brand[];
    shops: Shop[];
    goods: Good[]

    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private goodSkuService: GoodSkuService,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private brandService: BrandService,
                private shopService: ShopService,
                private goodService: GoodService) {
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

    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('goodSkuListModification', (response) => this.loadAll());
    }

    loadAll() {
        this.goodSkuService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(GoodSku)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }

    trackIdentity(index, item: GoodSku) {
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
        this.router.navigate(['/dingding/section/sku'], {
            queryParams: {
                page: this.page,
            }
        });
        this.loadAll();
    }

    private onSuccess(data) {
        console.log(data);
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.goodSkus = data.content;
        }
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    add() {
        this.goodSkuService.goodSkuId = null;
        const activeModal = this.modalService.open(GoodSkuAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    check(id) {
        this.goodSkuService.goodSkuId = id;
        const activeModal = this.modalService.open(GoodSkuDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    edit(id) {
        this.goodSkuService.goodSkuId = id;
        const activeModal = this.modalService.open(GoodSkuAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    delete(id) {
        if (window.confirm('确定删除该商品?')) {
            this.goodSkuService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'goodSkuListModification',
                    content: 'Deleted a goodSku'
                });
            });
        }
    }
}
