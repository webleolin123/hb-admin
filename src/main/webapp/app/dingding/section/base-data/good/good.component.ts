import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {GoodService} from "./good.service";
import {Good} from "./good.model";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, TASK_EXPORT_GOOD_AND_SKU, IMAGE_API_URL} from '../../../../app.constants';
import {GoodAddComponent} from "./good-add.component";
import {BrandService} from "../brand/brand.service";
import {ShopService} from "../shop/shop.service";
import {Shop} from "../shop/shop.model";
import {Brand} from "../shop/brand.model";
import {GoodDetailComponent} from "./good-detail.component";
import {UserService} from "../../../../core/user/user.service";
@Component({
    selector: 'ngx-good',
    templateUrl: './good.component.html',
    styleUrls: ['../../../../../content/scss/table.scss']
})
export class GoodComponent implements OnInit, OnDestroy {
    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + TASK_EXPORT_GOOD_AND_SKU,
        method: 'POST',
        itemAlias: 'uploadedfile'
    });
    headers: Headers;
    imageUrl: string;
    imageMd5: string;

    currentAccount: any;
    goods: Good[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    totalElements: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;

    brand: Brand;
    shop: Shop;

    searchItem: any;

    shopId: any;
    brandId: any;

    isSearch: boolean;

    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private goodService: GoodService,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private brandService: BrandService,
                private shopService: ShopService,
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
        this.shopId = this.userService.shopId;
        this.brandId = this.userService.brandId;
        this.isSearch = false;
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
        this.eventManager.subscribe('goodListModification', (response) => this.loadAll());
    }

    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }

    loadAll() {
        if (this.shopId) {
            this.shopService.queryByShopIdAndBrandId({
                shopId: this.shopId,
                page: this.page - 1,
                size: this.itemsPerPage,
            }).subscribe(
                (res: HttpResponse<(Good)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        } else if (this.brandId) {
            this.shopService.queryByShopIdAndBrandId({
                brandId: this.brandId,
                page: this.page - 1,
                size: this.itemsPerPage,
            }).subscribe(
                (res: HttpResponse<(Good)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        } else {
            this.goodService.query({
                page: this.page - 1,
                size: this.itemsPerPage,
            }).subscribe(
                (res: HttpResponse<(Good)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }

    reLoadAll() {
        this.shopId = null;
        this.brandId = null;
        this.loadAll();
    }

    trackIdentity(index, item: Good) {
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
        this.router.navigate(['/dingding/section/good'], {
            queryParams: {
                page: this.page,
            }
        });
        if (this.isSearch == false) {
            this.loadAll();
        } else {
            this.search();
        }
    }

    private onSuccess(data) {
        console.log(data);
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.goods = data.content;
        }
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    selectedFileOnChanged() {
        const x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            console.log(response);
            console.log(status);
            console.log(headers);
            // 上传文件成功
            // if (status == 200) {
            //     // 上传文件后获取服务器返回的数据
            //     let tempRes = JSON.parse(response);
            //     this.imageUrl = IMAGE_API_URL + tempRes.info.md5;
            //     this.imageMd5 = tempRes.info.md5;
            //     console.log(this.imageMd5)
            // } else {
            //     // 上传文件后获取服务器返回的数据错误
            //     console.log(response);
            // }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }

    add() {
        this.goodService.goodId = null;
        const activeModal = this.modalService.open(GoodAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    check(id) {
        this.goodService.goodId = id;
        const activeModal = this.modalService.open(GoodDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    edit(id) {
        this.goodService.goodId = id;
        const activeModal = this.modalService.open(GoodAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    delete(id) {
        if (window.confirm('确定删除该商品?')) {
            this.goodService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'goodListModification',
                    content: 'Deleted a good'
                });
            });
        }
    }

    // 搜索
    search() {
        this.isSearch = true;
        if (this.searchItem) {
            this.goodService.seatchGood({
                searchItem: this.searchItem,
                page: this.page - 1,
                size: this.itemsPerPage,
            }).subscribe(
                (res: HttpResponse<(Good)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        } else {
            alert('搜索内容不能为空！');
        }
    }

}
