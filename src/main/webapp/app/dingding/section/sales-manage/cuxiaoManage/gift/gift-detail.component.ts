import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
// import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {ApproverInfo} from '../../../../../common/http/approver-info.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {ActionProcess} from '../../../../../common/http/action-process.model';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector: 'jhi-gift-detail-dialog',
    templateUrl: './gift-detail.component.html',
    styleUrls:['../../../../../../content/scss/detail.scss']
})
export class GiftDetailComponent implements OnInit{
    // gift: ApproverCommonInfo;
    gift: ApproverInfo;
    actionProcesses: ActionProcess[];
    selectedCopyToList: any; // 抄送人列表
    selectedApproveList: any; // 审批人列表
    companyPrice: any;
    factoryPrice:any;
    user:Array<any>;
    constructor(private giftService: MyHttpService,
                private route: ActivatedRoute,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {
    }
    ngOnInit() {
        this.load();
    }
    load(){
        if (this.giftService.approverCommonId) {
            this.giftService.find(this.giftService.approverCommonId)
                .subscribe(
                    (res: HttpResponse<ApproverInfo>) => {this.onSuccess(res.body)},
                    (res: HttpResponse<any>) => this.onError(res)
                )
        }
        else {
            this.gift = new ApproverInfo;
        }
    }
    private onSuccess(data) {
        this.gift = data;
        this.selectedCopyToList = [];
        this.selectedApproveList = [];
        if (this.gift.approveInfoDTO.copyPeople.length != 0) {
            this.user=[];
            this.gift.approveInfoDTO.copyPeople.forEach((myCopyTo) => {
                if (myCopyTo != null) {
                    this.user=this.selectedCopyToList.filter(user => user.dingId == myCopyTo.dingId);
                    if ( this.user.length == 0) {
                        this.selectedCopyToList.push(myCopyTo);
                    }
                }
            });
        }
        if (this.gift.approveInfoDTO.firstApprovers.length != 0) {
            this.user=[];
            this.gift.approveInfoDTO.firstApprovers.forEach((myApprover) => {
                if (myApprover != null) {
                    this.user = this.selectedApproveList.filter(user => user.dingId == myApprover.dingId);
                    if ( this.user .length == 0 && this.selectedApproveList.length < 3) {
                        this.selectedApproveList.push(myApprover.dingName).toString();
                    }
                }
            });
        }
        if (data.approveInfoDTO.actionProcess.length != 0) {
            this.actionProcesses = data.approveInfoDTO.actionProcess;
        }
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    // countDays(startDate, endDate) {
    //     const iDays = Math.floor(Math.abs(Date.parse(startDate) - Date.parse(endDate)) / (24 * 3600 * 1000) + 1);
    //     this.companyPrice = iDays * this.gift.perPrice;
    //     this.factoryPrice = iDays * this.gift.perPriceOfSupport;
    //     return iDays// 相差天数
    // }
    // countMonth(startDate, endDate) {
    //     const iMonth = Math.floor(Math.abs(Date.parse(startDate) - Date.parse(endDate)) / (30 * 24 * 3600 * 1000) + 1);
    //     this.companyPrice = iMonth * this.gift.perPrice;
    //     this.factoryPrice = iMonth * this.gift.perPriceOfSupport;
    //     return iMonth;
    // }
    timestampToTime(timestamp) {
        const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        // D = date.getDate() + ' ';
        const h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
        const m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
        const s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        // return M + D + h + m;
        const curTime = new Date();
        if (date.getDate() == curTime.getDate()) {
            return M + D + h + m;
        } else {
            return Y + M + D;
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
}
