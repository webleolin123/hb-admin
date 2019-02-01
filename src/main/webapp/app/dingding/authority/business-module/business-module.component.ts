/**
 * Created by Administrator on 2018/7/31.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {BusinessModuleService} from "./business-module.service";
import {BusinessModule} from "./business-module.model";
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../../core/user/user.service";
import {BusinessModuleAddComponent} from "./business-module-add.component";
import {BusinessModuleDetailComponent} from "./business-module-detail.component";
import {BusinessModuleChooseModuleComponent} from "./business-module-choose-module.component";
import {Subscription} from "rxjs/Subscription";
@Component({
    selector: 'ngx-business-module',
    templateUrl: './business-module.component.html',
    styleUrls: ['../../../../content/scss/table.scss']
})
export class BusinessModuleComponent implements OnInit, OnDestroy {
    currentAccount: any;

    businessModules: BusinessModule[];
    firstModules: BusinessModule[];
    secondModules: BusinessModule[];

    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;

    searchItem: any;
    isSearch: boolean;
    subsFirst: Subscription;
    subsSecond: Subscription;

    parentModuleIds: string;
    childModuleIds: string;

    checked: any;

    moduleLevel: any;

    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private businessModuleService: BusinessModuleService,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService) {
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
        this.isSearch = false;
        this.checked = [];
        this.moduleLevel = 0;
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('businessModuleListModification', (response) => this.loadAll());
    }

    ngOnDestroy() {
    }

    loadAll() {
        this.isSearch = false;
        this.businessModuleService.getParentOrChildModules({
            level: 0
        }).subscribe(
            (res: HttpResponse<(BusinessModule)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );

        this.businessModuleService.getParentOrChildModules({
            level: 1
        }).subscribe(
            (res: HttpResponse<(BusinessModule)[]>) => this.onQueryFirstModulesSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );

        this.businessModuleService.getParentOrChildModules({
            level: 2
        }).subscribe(
            (res: HttpResponse<(BusinessModule)[]>) => this.onQuerySecondModulesSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );



    }

    sort() {
        // const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        // if (this.predicate !== 'id') {
        //     result.push('id');
        // }
        // return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/dingding/authority/business-module'], {
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
        // this.totalItems = data.totalPages * 10;
        console.log(data);
        if (this.isSearch == false) {
            this.businessModules = data;
        } else {
            this.businessModules = data;
        }
    }

    private onQuerySecondModulesSuccess(data) {
      this.secondModules = data;
    }

    private onQueryFirstModulesSuccess(data) {
        this.firstModules = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    // 根据模块等级取得模块信息
    queryModuleByLevel() {
        this.loadAll();
    }

    search() {
        if (this.searchItem) {
            alert('功能正在开发中···');
        } else {
            alert('搜索内容不能为空！');
        }
    }

    add() {
        this.businessModuleService.businessModuleId = null;
        const activeModal = this.modalService.open(BusinessModuleAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    edit(id) {
        this.businessModuleService.businessModuleId = id;
        const activeModal = this.modalService.open(BusinessModuleAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    check(id) {
        this.businessModuleService.businessModuleId = id;
        const activeModal = this.modalService.open(BusinessModuleDetailComponent, {size: 'lg', container: 'nb-layout'});
    }

    deleteParentModule(id) {
        if (window.confirm('确定删除该条目?')) {
            this.businessModuleService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'businessModuleListModification',
                    content: 'Deleted a businessModule'
                });
            });
        }
    }

    delete(id){
        if (window.confirm('确定删除该条目?')) {
            this.businessModuleService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'businessModuleListModification',
                    content: 'Deleted a businessModule'
                });
            });
        }
    }

    addFirstModules(id) {
        this.businessModuleService.level = 1;
        const activeModal = this.modalService.open(BusinessModuleChooseModuleComponent, {
            size: 'lg',
            container: 'nb-layout'
        });
        this.subsFirst = this.eventManager.subscribe('chooseAddChildModulesDone', (response) => {
            this.childModuleIds = this.businessModuleService.childModuleIds;
            if (this.childModuleIds) {
                this.addParentRelationship(id);
            }
        })
    }

    // 添加二级模块
    addSecondModules(id) {
        this.businessModuleService.level = 2;
        const activeModal = this.modalService.open(BusinessModuleChooseModuleComponent, {
            size: 'lg',
            container: 'nb-layout'
        });
        this.subsSecond = this.eventManager.subscribe('chooseAddChildModulesDone', (response) => {
            this.childModuleIds = this.businessModuleService.childModuleIds;
            if (this.childModuleIds) {
                this.addParentRelationship(id);
            }
        })
    }

    addParentRelationship(id) {
        this.businessModuleService.addParentRelationship(id, this.childModuleIds).subscribe((res) => {
            this.eventManager.broadcast({name: 'businessModuleListModification', content: 'OK'});
            this.subsFirst.unsubscribe();
            this.subsSecond.unsubscribe();
        }, (err) => {
            console.log(err)
        });
    }

    // 删除一级模块
    deleteFirstModules(parentId, childId) {
        if (window.confirm('确定删除该子模块?')) {
            this.businessModuleService.removeParentRelationship(parentId, childId).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'businessModuleListModification',
                    content: 'Deleted businessModules'
                });
            });
        }
    }

    deleteFirstModule(id){
        if (window.confirm('确定删除该条目?')) {
            this.businessModuleService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'businessModuleListModification',
                    content: 'Deleted a businessModule'
                });
            });
        }
    }

    // 删除二级模块
    deleteSecondModules(parent: BusinessModule) {
        const childModuleIdsArray = [];
        parent.childModules.forEach((m) => {
            if (m.isSelected == true) {
                childModuleIdsArray.push(m.id)
            }
        });
        if (window.confirm('确定删除该模块下的子模块?')) {
            this.businessModuleService.removeParentRelationship(parent.id, childModuleIdsArray.toString()).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'businessModuleListModification',
                    content: 'Deleted businessModules'
                });
            });
        }
    }

    // 勾选子模块
    selectChild(parentId, childModule: BusinessModule) {

    }
}
