import {Component, OnInit} from '@angular/core';
import {GoodSku} from './good-sku.model';
import {GoodSkuService} from './good-sku.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'jhi-good-sku-detail',
    templateUrl: './good-sku-detail.component.html',
    styleUrls: ['../../../../../content/scss/detail.scss']
})
export class GoodSkuDetailComponent implements OnInit {
    goodSku: GoodSku;

    constructor(private goodSkuService: GoodSkuService,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {

    }

    ngOnInit() {
        if (this.goodSkuService.goodSkuId) {
            this.goodSkuService.find(this.goodSkuService.goodSkuId).subscribe(
                (res: HttpResponse<GoodSku>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }

    private onSuccess(data) {
        this.goodSku = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
