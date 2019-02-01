/**
 * Created by yl on 2018/4/17.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {PlatformService} from "./platform.service";
import {Platform} from "./platform.model";
import {NbThemeService} from "@nebular/theme";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from "@angular/router";
import {PlatformAddComponent} from "./platform-add.component";
import {PlatformDetailComponent} from "./platform-detail.component";
@Component({
    selector: 'ngx-platform',
    templateUrl: './platform.component.html',
    styleUrls: ['../../../../../content/scss/table.scss']
})
export class PlatformComponent implements OnInit, OnDestroy {
    currentAccount: any;
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    platforms: Platform[];
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
    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private platformService: PlatformService,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal) {
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
        this.eventManager.subscribe('platformListModification', (response) => this.loadAll());
    }
    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }
    loadAll() {
        this.platformService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(Platform)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    trackIdentity(index, item: Platform) {
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
        this.router.navigate(['/section/dingding/platform'], {
            queryParams: {
                page: this.page,
            }
        });
        this.loadAll();
    }
    private onSuccess(data) {
        console.log(this.platforms);
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.platforms = data.content;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    add() {
        this.platformService.platformId = null;
        const activeModal = this.modalService.open(PlatformAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    // 编辑
    edit(id) {
        this.platformService.platformId = id;
        const activeModal = this.modalService.open(PlatformAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    // 查看详情
    check(id) {
        this.platformService.platformId = id;
        const activeModal = this.modalService.open(PlatformDetailComponent, {size: 'lg', container: 'nb-layout'});
    }
    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.platformService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'platformListModification',
                    content: 'Deleted a platform'
                });
            });
        }
    }
}
