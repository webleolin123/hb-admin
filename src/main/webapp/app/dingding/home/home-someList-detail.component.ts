import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ApproverCommonInfo} from '../../common/http/approve-common.model';
import {MyHttpService} from '../../common/http/myHttp.service';
import {NbThemeService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs/Subscription";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {
    WORKFLOW_HOME_BUSINESS_DETAIL_API,
    WORKFLOW_HOME_GOODS_TREND_DETAIL_API,
    WORKFLOW_HOME_DETAIL_PERSON_DETAIL_API,
} from '../../app.constants';
@Component({
    selector: 'ngx-home-someList-detail',
    templateUrl: './home-someList-detail.component.html',
    styleUrls: ['../../../content/scss/table.scss']
})
export class HomeSomeListDetailComponent implements OnInit, OnDestroy {
    currentAccount: any;
    detailList: any;
    totalItems: any;
    itemsPerPage: any;
    totalElements: any;
    page: any;
    previousPage: any;
    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;
    //详情变量
    detailTitle:any='';
    isBusiness=false;
    detailType:any;
    detailName:any;
    isShow=false;
    constructor(
        private principal: Principal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private homeListDetailService: MyHttpService,
        private themeService: NbThemeService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        ) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });
        this.itemsPerPage = 5;
        this.page = 1;
        this.previousPage = 1;
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            if(account){
                this.currentAccount = account;
                this.loadAll();
            }
            else{
                this.router.navigate(['/account/login/1']);
            }
        });
        this.detailType=this.homeListDetailService.searchType;
        this.detailName=this.homeListDetailService.tmp;
        if(this.detailType=='goods'){
            this.isBusiness=false;
            this.detailTitle='商品';
            this.homeListDetailService.resourceUrl=WORKFLOW_HOME_GOODS_TREND_DETAIL_API;
        }
        if(this.detailType=='person'){
            this.isBusiness=false;
            this.detailTitle='人员';
            this.homeListDetailService.resourceUrl=WORKFLOW_HOME_DETAIL_PERSON_DETAIL_API;
        }
        if(this.detailType=='business'){
            this.detailTitle=this.detailName;
            this.isBusiness=true;//不显示具体名称
            this.homeListDetailService.resourceUrl=WORKFLOW_HOME_BUSINESS_DETAIL_API;
        }
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
    loadAll() {
        // 获取当前请求页面所有数据
        this.homeListDetailService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            month:this.homeListDetailService.time,
            id:this.homeListDetailService.approverCommonId,
        }).subscribe(
            (res: HttpResponse<(ApproverCommonInfo)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    pageSizechange(){
        this.loadAll();
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
        }
        else{
            this.page = 1;
            this.previousPage = 1;
        }
        this.loadAll();
    }
    showDetail(childList){
        if(childList.list.length==0){
            alert('暂无数据');
            return;
        }
        childList.isShow=!childList.isShow;
    }
    private onSuccess(data) {
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.detailList = data.content;
            this.detailList.forEach((item,i)=>{
                this.detailList[i].isShow=false;
            });
            console.log('this.detailList',this.detailList);
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
}
