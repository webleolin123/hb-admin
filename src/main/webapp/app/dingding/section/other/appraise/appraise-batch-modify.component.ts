import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppraiseService} from './appraise.service';
import {JhiEventManager} from 'ng-jhipster';
import {ShopService} from "../../base-data/shop/shop.service";
@Component({
    selector: 'jhi-appraise-batch-modify-dialog',
    templateUrl: './appraise-batch-modify.component.html'
})
export class AppraiseBatchModifyComponent implements OnInit {
    kind: any;
    info: string;
    ids: string;
    isSaving: Boolean;
    constructor(public activeModal: NgbActiveModal,
                private appraiseService: AppraiseService,
                private shopService: ShopService,
                private eventManager: JhiEventManager) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.ids = this.appraiseService.ids;
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    save() {
        if (this.kind && this.info) {
            this.appraiseService.batchModify(this.ids, this.info, this.kind).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError())
        } else {
            alert('请完整填写修改信息！');
        }
    }
    private onSaveSuccess(result) {
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }
    private onSaveError() {
        this.isSaving = false;
    }
}
