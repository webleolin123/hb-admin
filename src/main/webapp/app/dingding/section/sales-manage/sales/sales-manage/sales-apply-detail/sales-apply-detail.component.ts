import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Module} from '../module.model';
import {SaleService} from '../sales-manage.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector: 'jhi-sales-apply-detail',
    templateUrl: './sales-apply-detail.component.html',
    styleUrls:['../../../../../../../content/scss/detail.scss']
})
export class SalesApplyDetailComponent implements OnInit {
    module: Module;
    selectedCopyToList: any; // 抄送人列表
    selectedApproveList: any; // 审批人列表

    constructor(private saleService: SaleService,
                private route: ActivatedRoute,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {
    }

    ngOnInit(){

    }

    private onSuccess(data,headers){

    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
