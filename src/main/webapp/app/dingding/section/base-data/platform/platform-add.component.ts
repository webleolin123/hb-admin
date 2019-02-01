import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Platform} from './platform.model';
import {PlatformService} from './platform.service';

@Component({
    selector: 'jhi-platform-dialog',
    templateUrl: './platform-add.component.html'
})
export class PlatformAddComponent implements OnInit {

    platform: Platform;
    isSaving: Boolean;
    constructor(public activeModal: NgbActiveModal,
                private platformService: PlatformService,
                private eventManager: JhiEventManager,) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.load();
    }

    load() {
        if (this.platformService.platformId) {
            this.platformService.find(this.platformService.platformId).subscribe((response) => {
                this.platform = response.body;
            })
        } else {
            this.platform = new Platform;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.platform.id !== null) {
            this.platformService.update(this.platform).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.platformService.create(this.platform).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'platformListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
