import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Dict} from './dict.model';
import {DictService} from './dict.service';
import {HttpResponse} from '@angular/common/http';
@Component({
    selector: 'jhi-dict-dialog',
    templateUrl: './dict-add.component.html'
})
export class DictAddComponent implements OnInit {

    dict: Dict;
    mainDict: Dict[];
    isSaving: Boolean;

    constructor(public activeModal: NgbActiveModal,
                private dictService: DictService,
                private eventManager: JhiEventManager,
                private alertService: JhiAlertService) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.load();
        this.loadMainDict();
    }

    load() {
        if (this.dictService.dictId) {
            this.dictService.find(this.dictService.dictId).subscribe((response) => {
                this.dict = response.body;
                console.log(response);
            })
        } else {
            this.dict = new Dict;
            this.dict.parentId = this.dictService.parentId;
        }
    }

    loadMainDict() {
        this.dictService.queryMainList({parentId: 1}).subscribe((res: HttpResponse<Dict[]>) => this.onQueryMainDictSuccess(res.body),
            (res: any) => this.onError(res.json()));
    }

    private onQueryMainDictSuccess(data) {
        this.mainDict = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.dict.isSystem = 1;
        this.dict.isReadOnly = 1;
        if (this.dict.id !== null) {
            this.dictService.update(this.dict).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.dictService.create(this.dict).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'mainDictListModification', content: 'OK'});
        this.eventManager.broadcast({name: 'childDictListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}
