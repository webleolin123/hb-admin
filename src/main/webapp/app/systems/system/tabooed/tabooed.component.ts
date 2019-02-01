import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {TabooedService} from "./tabooed.service";
import {Tabooed} from "./tabooed.model";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../../core/user/user.service";
import {TabooedAddComponent} from "./tabooed-add.component";
@Component({
    selector: 'jhi-tabooed',
    templateUrl: './tabooed.component.html',
    styleUrls: ['../../../../content/scss/table.scss']
})
export class TabooedComponent implements OnInit,OnDestroy {
    tabooeds: Tabooed[];
    currentAccount: any;
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    totalElements: any;
    searchItem: any;
    isSearch: boolean;

    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService,
                private tabooedService: TabooedService) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.itemsPerPage = 14;
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
    ngOnDestroy() {
        this.eventManager.subscribe('labelListModification', response => this.loadAll());
    }
    registerChangeInUsers() {
        this.eventManager.subscribe('tabooedListModification', response => this.loadAll());
    }
    loadAll() {
        this.tabooedService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(Tabooed)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );

    }
    trackIdentity(index, item: Tabooed) {
        return item.id;
    }
    sort() {
        // let result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
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
        this.router.navigate(['/systems/system/tabooed'], {
            queryParams: {
                page: this.page,
            }
        });
        this.loadAll();
    }
    private onSuccess(data,) {
        this.tabooeds = data;
        // if(data){
        //     this.totalItems = data.totalPages * 10;
        //     this.totalElements = data.totalElements;
        //     this.tabooeds = data.content;
        // }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    add() {
        this.tabooedService.tabooedId = null;
        const activeModal = this.modalService.open(TabooedAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    edit(id) {
        this.tabooedService.tabooedId = id;
        const activeModal = this.modalService.open(TabooedAddComponent, {size: 'lg', container: 'nb-layout'});
    }
    search() {
        alert('功能正在开发中...');
    }
    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.tabooedService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'tabooedListModification',
                    content: 'Deleted a tabooed'
                });
            });
        }
    }
}
