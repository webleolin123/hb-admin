/**
 * Created by Administrator on 2018/7/5.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Appraise} from './appraise.model';
import {AppraiseService} from './appraise.service';
@Component({
    selector: 'jhi-appraise-edit-dialog',
    templateUrl: './appraise-edit.component.html'
})

export class AppraiseEditComponent implements OnInit {

    appraise: Appraise;
    isSaving: Boolean;

    constructor(public activeModal: NgbActiveModal,
                private appraiseService: AppraiseService,
                private eventManager: JhiEventManager,) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.load();
    }

    load() {
        if (this.appraiseService.appraiseId) {
            this.appraiseService.find(this.appraiseService.appraiseId).subscribe((response) => {
                this.appraise = response.body;
                if (this.appraise.touch == false ||this.appraise.touch == null) {
                    this.appraise.touch = 0;
                } else {
                    this.appraise.touch = 1;
                }
                console.log(response);
            })
        } else {
            this.appraise = new Appraise;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.appraise.touch == 0) {
            this.appraise.touch = false;
        } else {
            this.appraise.touch = true;
        }
        if (this.appraise.id !== null) {
            this.appraiseService.update(this.appraise).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.appraiseService.create(this.appraise).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'appraiseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
