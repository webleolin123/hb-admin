/**
 * Created by Administrator on 2018/7/31.
 */
import {Component, OnInit} from '@angular/core';
import {BusinessModule} from './business-module.model';
import {BusinessModuleService} from './business-module.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IMAGE_API_URL} from "../../../app.constants";
import {BusinessModuleAddComponent} from "./business-module-add.component";
@Component({
    selector: 'jhi-business-module-detail',
    templateUrl: './business-module-detail.component.html',
    styleUrls: ['../../../../content/scss/detail.scss']
})
export class BusinessModuleDetailComponent implements OnInit {
    businessModule: BusinessModule;
    baseImageUrl: any;

    constructor(private businessModuleService: BusinessModuleService,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,
                private modalService: NgbModal) {

    }

    ngOnInit() {
        this.baseImageUrl = IMAGE_API_URL;
        if (this.businessModuleService.businessModuleId) {
            this.businessModuleService.find(this.businessModuleService.businessModuleId).subscribe(
                (res: HttpResponse<BusinessModule>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }

    private onSuccess(data) {
        console.log(data);
        this.businessModule = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    edit(id){
        this.businessModuleService.businessModuleId = id;
        const activeModal = this.modalService.open(BusinessModuleAddComponent, {size: 'lg', container: 'nb-layout'});
        this.clear();
    }
}
