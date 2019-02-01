/**
 * Created by Administrator on 2018/7/4.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {TabooedService} from './tabooed.service';
import {Tabooed} from './tabooed.model';
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, UPLOAD_IMAGE_API, IMAGE_API_URL} from '../../../app.constants';
@Component({
    selector: 'ngx-tabooed-add',
    templateUrl: './tabooed-add.component.html'
})

export class TabooedAddComponent implements OnInit {

    tabooed: Tabooed;
    isSaving: Boolean;

    constructor(public activeModal: NgbActiveModal,
                private tabooedService: TabooedService,
                private eventManager: JhiEventManager,) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.load();
    }

    load() {
        if (this.tabooedService.tabooedId) {
            this.tabooedService.find(this.tabooedService.tabooedId).subscribe((response) => {
                this.tabooed = response.body;
            })
        } else {
            this.tabooed = new Tabooed;
        }
    }

    clear() {
        this.activeModal.dismiss('cancle');
    }

    save() {
        this.isSaving = true;
        if (this.tabooed.id !== null) {
            this.tabooedService.update(this.tabooed).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.tabooedService.create(this.tabooed).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'tabooedListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(true);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}
