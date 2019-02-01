/**
 * Created by Administrator on 2018/7/5.
 */

import {Component, OnInit} from '@angular/core';
import {Appraise} from './appraise.model';
import {AppraiseService} from './appraise.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector: 'jhi-appraise-detail',
    templateUrl: './appraise-detail.component.html',
    styleUrls: ['../../../../../content/scss/detail.scss']
})
export class AppraiseDetailComponent implements OnInit {
    appraise: Appraise;
    constructor(private appraiseService: AppraiseService,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {
    }

    ngOnInit() {
        if (this.appraiseService.appraiseId) {
            this.appraiseService.find(this.appraiseService.appraiseId).subscribe(
                (res: HttpResponse<Appraise>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }

    private onSuccess(data) {
        console.log(data);
        this.appraise = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
