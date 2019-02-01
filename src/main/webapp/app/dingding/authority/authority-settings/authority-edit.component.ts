/**
 * Created by Administrator on 2018/8/2.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Authority} from './authority.model';
import {AuthorityService} from './authority.service';
@Component({
    selector: 'jhi-authority-edit-dialog',
    templateUrl: './authority-edit.component.html'
})
export class AuthorityEditComponent implements OnInit{
    authority: Authority;
    isSaving: Boolean;
    constructor(public activeModal: NgbActiveModal,
                private authorityService: AuthorityService,
                private eventManager: JhiEventManager,) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.authority = new Authority;
        this.load();
    }
    load() {
        if (this.authorityService.authorityId) {
            this.authorityService.find(this.authorityService.authorityId).subscribe((response) => {
                this.authority = response.body;
                console.log(response);
            })
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    save() {
        if(!this.authority.permissionType){
            alert('请选择权限!');
            return
        }
        if(!this.authority.approvePermissionValue){
            alert('请选择权限类型!');
            return
        }
        if((this.authority.permissionType!=7&&this.authority.approvePermissionValue!=21)&&!this.authority.brandRange){
            alert('请选择范围!');
            return
        }
        this.isSaving = true;
        if(this.authority.approvePermissionValue==21||this.authority.permissionType==7){
            this.authority.brandRange=null;
        }
        this.authorityService.update(this.authority).subscribe((response) => this.onSaveSuccess(response),() => this.onSaveError());
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'authorityListInfo', content: 'authorityListEdit'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }
    private onSaveError() {
        this.isSaving = false;
    }
}
