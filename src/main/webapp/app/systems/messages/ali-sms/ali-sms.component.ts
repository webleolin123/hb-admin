import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {AliSmsService} from "./ali-sms.service";
import {AliSms} from "./ali-sms.model";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../../core/user/user.service";
import {AliSmsDetailComponent} from "./ali-sms-detail.component";
@Component({
    selector: 'jhi-ali-sms',
    templateUrl: './ali-sms.component.html',
    styleUrls: ['../../../../content/scss/table.scss']
})
export class AliSmsComponent implements OnInit,OnDestroy {
    alis: AliSms[];
    currentAccount: any;
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
    isSearch: boolean;

    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;

    constructor(private aliSmsService: AliSmsService,
                private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.itemsPerPage = 13;
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
        this.themeSubscription.unsubscribe();
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('aliSmsListModification', response => this.loadAll());
    }

    loadAll() {
        this.aliSmsService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(AliSms)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }

    trackIdentity(index, item: AliSms) {
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
        this.router.navigate(['/systems/messages/ali-sms'], {
            queryParams: {
                page: this.page,
            }
        });
        this.loadAll();
    }

    private onSuccess(data) {
        this.alis = data;
        console.log('data',data);
        // if(data){
        //     this.totalItems = data.totalPages * 10;
        //     this.totalElements = data.totalElements;
        //     this.alis = data.content;
        // }
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    check(id){
        this.aliSmsService.aliSmsId = id;
        const activeModal = this.modalService.open(AliSmsDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.aliSmsService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'aliSmsListModification',
                    content: 'Deleted a aliSms'
                });
            });
        }
    }

    search(){
        alert('功能正在开发中...');
    }
}
