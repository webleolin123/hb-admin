import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User, UserService } from '../../../core';
import {JhiAlertService,JhiEventManager} from "ng-jhipster";
@Component({
    selector: 'jhi-user-dialog',
    templateUrl: './user-dialog.component.html'
})
export class UserDialogComponent implements OnInit {
    user: User;
    isSaving: Boolean;
    authorities: any;
    authoritiesBox: any;
    constructor(
        public activeModal: NgbActiveModal,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private alertService: JhiAlertService,
        ) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.authorities = [];
        this.authoritiesBox = [];
        this.load();
    }
    load() {
        if (this.userService.login) {
            this.userService.find(this.userService.login).subscribe((res) => {
                console.log('res',res);
                this.user = res.body;
                this.authoritiesBox = this.user.authorities;
            })
        }
        else {
            this.user = new User;
            this.authoritiesBox = [];
        }
        this.userService.authorities().subscribe((authorities) => {
            console.log('authorities',authorities);
            this.authorities = authorities.body;
        });
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    inputChange() {
        this.user.password = this.user.login;
    }
    save() {
        this.isSaving = true;
        this.user.langKey = 'en';
        this.user.authorities = this.authoritiesBox;
        if (this.user.id) {
            this.userService.update(this.user).subscribe((response) => this.onSaveSuccess(response), (res:Response) => this.onSaveError(res.json()));
        } else {
            this.user.activated = true;
            this.user.emailVerified = false;
            this.user.mobilePhoneVerified = false;
            this.userService.create(this.user).subscribe((response) => this.onSaveSuccess(response), (res:Response) => this.onSaveError(res.json()));
        }
    }
    private onSaveSuccess(res) {
        console.log('res',res)
        if (this.user.id){
            alert(this.user.id);
            this.eventManager.broadcast({ name: 'userEditInfo', content: res.status});
        }
        else{
            alert(this.user.id);
            alert(res.status);
            this.eventManager.broadcast({ name: 'userCreateInfo', content: res.status });
        }
        this.isSaving = false;
        this.activeModal.dismiss(true);
    }
    private onSaveError(error) {
        this.isSaving = false;
        this.alertService.error(error.error, error.message, null);
    }
}
