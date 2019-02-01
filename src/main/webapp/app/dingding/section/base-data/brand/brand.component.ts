import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {BrandService} from "./brand.service";
import {Brand} from "./brand.model";
import {BrandAddComponent} from "./brand-add.component";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../../../core/user/user.service";
import {Subscription} from "rxjs/Subscription";
@Component({
    selector: 'ngx-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['../../../../../content/scss/table.scss']
})
export class BrandComponent implements OnInit, OnDestroy {
    subBrandInfo: Subscription;
    currentAccount: any;
    brands: Brand[];
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
                private brandService: BrandService,
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
        this.subBrandInfo=this.eventManager.subscribe('brandListModification', (response) =>{
            if(response.content=='Edit a brand'){
                alert('编辑成功');
            }
            if(response.content=='Create a brand'){
                alert('创建成功');
            }
            if(response.content=='Deleted a brand'){
                alert('删除成功');
            }
            this.loadAll();
        })
    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
        this.subBrandInfo.unsubscribe();
    }
    loadAll() {
        this.brandService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(Brand)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    trackIdentity(index, item: Brand) {
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
        this.router.navigate(['/dingding/section/brand'], {
            queryParams: {
                page: this.page,
            }
        });
        this.loadAll();
    }
    private onSuccess(data) {
        console.log('data',data);
        if(data){
            this.brands = data.content;
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    add() {
        this.brandService.brandId = null;
        const activeModal = this.modalService.open(BrandAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    edit(id) {
        this.brandService.brandId = id;
        const activeModal = this.modalService.open(BrandAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    // 查看商品
    checkGood(id) {
        this.userService.brandId = id;
        this.userService.shopId = null;
        this.router.navigate(['/dingding/section/good']);
    }
    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.brandService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'brandListModification',
                    content: 'Deleted a brand'
                });
            });
        }
    }
}
