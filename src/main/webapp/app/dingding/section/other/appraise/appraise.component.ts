import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {AppraiseService} from "./appraise.service";
import {Appraise} from "./appraise.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppraiseDetailComponent} from "./appraise-detail.component";
import {AppraiseEditComponent} from "./appraise-edit.component";
import {AppraiseFilterComponent} from "./appraise-filter.component";
import {Subscription} from "rxjs/Subscription";
import {AppraiseBatchModifyComponent} from "./appraise-batch-modify.component";
import {AppraiseUploadComponent} from "./appraise-upload.component";
import {ToasterConfig} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import {UserService} from "../../../../core/user/user.service";
@Component({
    selector: 'ngx-appraise',
    templateUrl: './appraise.component.html',
    styleUrls: ['../../../../../content/scss/table.scss']
})
export class AppraiseComponent implements OnInit, OnDestroy {
    subs: Subscription;
    subsExportInfo: Subscription;
    currentAccount: any;
    appraises: Appraise[];
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
    // toast配置
    config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-center',
        timeout: 2000,
        newestOnTop: true,
        tapToDismiss: true,
        preventDuplicates: false,
        animation: 'fade',
        limit: 5,
    });
    searchItem: any;
    searchType: any = 1;
    isSearch: boolean;
    exportDatas: any; // 导出excell的数据变量
    array: any;  // 数组容器
    data: any; // 对象容器
    appraiseString: string;
    labelsString: string;
    selectAll: boolean;
    selectOne: boolean;
    m: any;
    checked: any;
    startTime: any;
    endTime: any;
    storeName: any;
    getPage: any;
    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private appraiseService: AppraiseService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService) {
        this.itemsPerPage = 20;
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
        this.getPage = 0;
        this.array = [];
        this.exportDatas = [];
        this.m = [];
        this.checked = [];
    }
    registerChangeInUsers() {
        this.subs=this.eventManager.subscribe('appraiseListModification', (response) => this.loadAll());
        this.subsExportInfo = this.eventManager.subscribe('appraiseTimeChooseDoneModification', (response) => {
            if(response.content=='OK'){
                this.startTime = this.appraiseService.startTime;
                this.endTime = this.appraiseService.endTime;
                this.storeName = this.appraiseService.storeName;
                if (this.startTime && this.endTime && this.storeName) {
                    this.findByTimeBetween();
                }
                alert('导出成功');
            }
        });
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
        this.subsExportInfo.unsubscribe();
    }
    loadAll() {
        this.isSearch = false;
        this.appraiseService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
        }).subscribe(
            (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
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
        this.selectAll = false;
        this.router.navigate(['/dingding/section/appraise'], {
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
        this.totalItems = data.totalPages * 10;
        this.totalElements = data.totalElements;
        if (this.isSearch == false) {
            this.appraises = data.content;
        } else {
            this.appraises = data.content;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    uploadFile() {
        const activeModal = this.modalService.open(AppraiseUploadComponent, {size: 'lg', container: 'nb-layout'});
    }
    search() {
        this.isSearch = true;
        if (this.searchItem) {
            if (this.searchType == 1) { // 淘宝ID
                this.appraiseService.findAllByCustomId({
                    customerId: this.searchItem,
                    page: this.page - 1,
                    size: this.itemsPerPage,
                }).subscribe(
                    (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                    (res: Response) => this.onError(res.json())
                );
            } else if (this.searchType == 2) { // 商品ID
                this.appraiseService.findAllByGoodsId({
                    goodsId: this.searchItem,
                    page: this.page - 1,
                    size: this.itemsPerPage,
                }).subscribe(
                    (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                    (res: Response) => this.onError(res.json())
                );
            } else if (this.searchType == 3) { // 订单号
                this.page = 1;
                this.appraiseService.findAllByOrderCode({
                    orderCode: this.searchItem,
                    page: this.page - 1,
                    size: this.itemsPerPage,
                }).subscribe(
                    (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                    (res: Response) => this.onError(res.json())
                );
            } else if (this.searchType == 4) {
                this.appraiseService.findAllByLabels({
                    labels: this.searchItem,
                    page: this.page - 1,
                    size: this.itemsPerPage,
                }).subscribe(
                    (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                    (res: Response) => this.onError(res.json())
                );
            } else if (this.searchType == 5) {
                this.appraiseService.findAllByContent({
                    content: this.searchItem,
                    page: this.page - 1,
                    size: this.itemsPerPage,
                }).subscribe(
                    (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                    (res: Response) => this.onError(res.json())
                );
            } else if (this.searchType == 6) {
                this.appraiseService.findAllByStoreName({
                    storeName: this.searchItem,
                    page: this.page - 1,
                    size: this.itemsPerPage,
                }).subscribe(
                    (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                    (res: Response) => this.onError(res.json())
                );
            }
        } else {
            alert('搜索内容不能为空');
        }
    }
    edit(id) {
        this.appraiseService.appraiseId = id;
        const activeModal = this.modalService.open(AppraiseEditComponent, {size: 'lg', container: 'nb-layout'});
    }
    // 查看
    checkGood(id) {
        this.appraiseService.appraiseId = id;
        const activeModal = this.modalService.open(AppraiseDetailComponent, {size: 'lg', container: 'nb-layout'});
    }
    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.appraiseService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'appraiseListModification',
                    content: 'Deleted a appraise'
                });
            });
        }
    }
    // 导出csv文件
    export() {
        const activeModal = this.modalService.open(AppraiseFilterComponent, {size: 'lg', container: 'nb-layout'});
    }
    findByTimeBetween() {
        this.appraiseService.findByTimeBetween({
            startTime: this.startTime,
            endTime: this.endTime,
            storeName: this.storeName,
            size: 9999,
            page: this.getPage
        }).subscribe((res: HttpResponse<Appraise[]>) => this.onQueryExportDataSuccess(res.body),
            (res: Response) => this.onError(res.json()));
    }
    private onQueryExportDataSuccess(data) {
        // if (!data.last) {
        //     this.exportDatas = this.exportDatas.concat(data.content);
        //     this.getPage = data.number + 1;
        //     this.findByTimeBetween();
        // }
        // else{
            this.array = [];
            this.exportDatas = this.exportDatas.concat(data.content);
            this.exportDatas.forEach((value, index, array) => {
                this.appraiseString = "";
                this.labelsString = "";
                // 过滤emoji
                const emojiReg =
                    /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
                let when = '';
                value.appraiseContents.forEach((item) => {
                    if (when.length == 0) {
                        when = item.when.substring(0, 10);
                    }
                    this.appraiseString += item.appraise + '\n';
                    this.appraiseString = this.appraiseString.replace(emojiReg, "").replace(/(\s*$)/g, "").replace(/[&nbsp;]+/g, "").replace(',', '，').trim();
                    item.appraiseLabels.forEach((label) => {
                        this.labelsString += label.label + ',';
                    });
                });
                this.appraiseString += ' ,' + when;
                this.data = {
                    num1: value.customerId + '\t',
                    num2: value.orderCode + '\t',
                    num3: value.goodsId + '\t',
                    num4: value.store,
                    num5: value.goodsName,
                    num6: this.appraiseString,
                    num7: value.sku,
                    num8: value.cause,
                    num9: value.analysisOfCauses,
                    num10: value.touch,
                    num11: value.react,
                    num12: value.proposalsForHandling,
                    num13: this.labelsString,
                };
                this.array.push(this.data);
            });
            this.userService.exportCsv({
                title: ["淘宝ID", "订单号", "商品ID", "店铺", "商品", "评价", "评价时间", "商品sku", "原因", "原因分析", "是否联系客服", "接待客服", "处理方案", "标签"],
                titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num10", "num11", "num12", "num13"],
                data: this.array
            }, "评价采集.csv");
            this.exportDatas = [];
            this.getPage = 0;
            // this.subs.unsubscribe();
        // }
    }
    selectM() {
        if (this.selectAll) {
            this.checked = [];
            this.appraises.forEach((i) => {
                i.checked = true;
                this.checked.push(i.id);
            })
        } else {
            this.appraises.forEach((i) => {
                i.checked = false;
                this.checked = [];
            })
        }
        this.appraiseService.ids = this.checked.toString();
        console.log(this.appraiseService.ids);
    }
    selectN() {
        this.appraises.forEach((i) => {
            const index = this.checked.indexOf(i.id);
            if (i.checked && index === -1) {
                this.checked.push(i.id);
            } else if (!i.checked && index !== -1) {
                this.checked.splice(index, 1);
            }
        });
        if (this.checked.length == 20) {
            this.selectAll = true;
        } else {
            this.selectAll = false;
        }
        this.appraiseService.ids = this.checked.toString();
    }
    batch() {
        this.appraiseService.ids = this.checked.toString();
        const activeModal = this.modalService.open(AppraiseBatchModifyComponent, {size: 'lg', container: 'nb-layout'});
    }
    deleteSelected(){
        this.appraiseService.ids = this.checked.toString();
        if (window.confirm('确定批量删除评价?')) {
            this.appraiseService.batchDelete(this.appraiseService.ids).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'appraiseListModification',
                    content: 'Deleted appraises'
                });
            });
        }
    }
}
