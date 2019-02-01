/**
 * Created by Administrator on 2018/5/16.
 */
import {Component, OnInit } from '@angular/core';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {HttpResponse} from '@angular/common/http';
import {NbThemeService} from "@nebular/theme";
declare var tinymce: any;

import {HelpRoles} from './help-roles.model';
import {HelpRolesService} from './help-roles.service'
import {Principal} from "../../../../core/auth/principal.service";
import {HelpRolesAddComponent} from "./help-roles-add.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {HelpRolesDetailComponent} from "./help-roles-detail.component";
@Component({
    selector: 'ngx-help-roles',
    templateUrl: './help-roles.component.html',
    styleUrls: ['../../../../../content/scss/table.scss']
})
export class HelpRolesComponent implements OnInit {
    currentAccount: any; // 当前登录用户

    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    helpRoleses: HelpRoles[];
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
                private themeService: NbThemeService,
                private helpRolesService: HelpRolesService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.itemsPerPage = 15;
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
        this.eventManager.subscribe('helpRolesListModification', (response) => this.loadAll());
    }

    loadAll() {
        this.helpRolesService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(HelpRoles)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }

    trackIdentity(index, item: HelpRoles) {
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
        this.router.navigate(['/dingding/section/help-roles'], {
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
            this.helpRoleses = data.content;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    add() {
        this.helpRolesService.helpRolesId = null;
        const activeModal = this.modalService.open(HelpRolesAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    check(id) {
        this.helpRolesService.helpRolesId = id;
        const activeModal = this.modalService.open(HelpRolesDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    edit(id) {
        this.helpRolesService.helpRolesId = id;
        const activeModal = this.modalService.open(HelpRolesAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.helpRolesService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'helpRolesListModification',
                    content: 'Deleted a helpRoles'
                });
            });
        }
    }

}
