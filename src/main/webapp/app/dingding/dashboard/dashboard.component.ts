import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// chart服务类 注意先注入
import {HttpResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ApproverCommonInfo} from '../../common/http/approve-common.model';
import {MyHttpService} from '../../common/http/myHttp.service';
@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit,OnDestroy {
    searchYear:Subscription;//选择年时广播信息
    searchMonth:Subscription;//选择月时广播信息
    searchDay:Subscription;//选择日时广播信息
    title='查看数据';//chart组件title名
    nameArr=['总提交数','待处理数','已处理数'];//chart组件item名
    onlyDay=false;
    onlyMonth=true;
    onlyYear=false;
    onlyFlag=true;
    constructor(
        private activeModal:NgbActiveModal,
        private eventManager: JhiEventManager,
        private clfService: MyHttpService,
        private alertService: JhiAlertService,
    ) {}

    ngOnInit() {
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('response',response);
            if(response.name=='saveDayValue'){
                this.clfService.view_day({
                    startTime:response.content.startTime,
                    endTime:response.content.endTime
                })
                    .subscribe(
                        (res: HttpResponse<ApproverCommonInfo>) =>{
                            console.log('res.body',res.body);
                            this.eventManager.broadcast({
                                name: 'saveDayValue_result',
                                content:res.body,
                            });
                        },
                        (res: Response) => this.onError(res.json())
                    );
            }
        } );
        // 请求月
        this.searchMonth=this.eventManager.subscribe('saveMonthValue', response => {
            console.log('response',response);
            if(response.name=='saveMonthValue'){
                this.clfService.view_month({
                    dateTime: response.content,
                }).subscribe(
                    (res: HttpResponse<ApproverCommonInfo>) => {
                        this.eventManager.broadcast({
                            name: 'saveMonthValue_result',
                            content:res.body,
                        });
                    },
                    (res: Response) => this.onError(res.json())
                );
            }
        } );
        // 请求年
        this.searchYear=this.eventManager.subscribe('saveYearValue', response => {
            console.log('response',response);
            if(response.name=='saveYearValue'){
                this.clfService.view_year({
                    dateTime: response.content,
                }).subscribe(
                    (res: HttpResponse<ApproverCommonInfo>) => {
                        this.eventManager.broadcast({
                            name: 'saveYearValue_result',
                            content:res.body,
                        });
                    },
                    (res: Response) => this.onError(res.json())
                );
            }
        } );
    }
    ngOnDestroy(){
        //取消广播订阅
        this.searchDay.unsubscribe();
        this.searchMonth.unsubscribe();
        this.searchYear.unsubscribe();
    }
    clear() {
        this.activeModal.dismiss('cancle');
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

}
