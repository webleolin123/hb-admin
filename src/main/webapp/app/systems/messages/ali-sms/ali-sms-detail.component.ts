/**
 * Created by Administrator on 2018/7/4.
 */
import {Component, OnInit} from '@angular/core';
import {AliSms} from './ali-sms.model';
import {AliSmsService} from './ali-sms.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'jhi-ali-sms.-detail',
    templateUrl: './ali-sms-detail.component.html',
    styleUrls: ['../../../../content/scss/detail.scss']
})
export class AliSmsDetailComponent implements OnInit {
    aliSms: AliSms;
    baseImageUrl: any;

    constructor(private aliSmsService: AliSmsService,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {

    }

    ngOnInit() {
        if (this.aliSmsService.aliSmsId) {
            this.aliSmsService.find(this.aliSmsService.aliSmsId).subscribe(
                (res: HttpResponse<AliSms>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }

    private onSuccess(data) {
        console.log(data);
        this.aliSms = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}

