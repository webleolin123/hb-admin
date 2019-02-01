import {Component, OnInit} from '@angular/core';
import {GoodDetail} from './good-detail.model';
import {GoodService} from './good.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector: 'jhi-good-detail',
    templateUrl: './good-detail.component.html',
    styleUrls: ['../../../../../content/scss/detail.scss']
})
export class GoodDetailComponent implements OnInit {
    good: GoodDetail;

    constructor(private goodService: GoodService,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {

    }

    ngOnInit() {
        if (this.goodService.goodId) {
            this.goodService.checkDetail(this.goodService.goodId).subscribe(
                (res: HttpResponse<GoodDetail>) => this.onSuccess(res),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }

    private onSuccess(data) {
        this.good = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
