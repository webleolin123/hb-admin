import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Notification} from './notification.model';
import {NotificationService} from './notification.service';

@Component({
    selector: 'notification-publish',
    templateUrl: './notification-publish.component.html',
})
export class NotificationPublishComponent implements OnInit {

    notification: Notification;
    isSaving: Boolean;
    constructor(public activeModal: NgbActiveModal,
                private notificationService: NotificationService,
                private eventManager: JhiEventManager) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.notification = new Notification;
        this.load();
    }

    load() {
        if (this.notificationService.notificationId) {
            this.notificationService.find(this.notificationService.notificationId).subscribe((response) => {
                this.notification = response.body;
            })
        } else {
            this.notification= new Notification;
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    save() {
        this.isSaving = true;
        this.notification.operator= this.notificationService.notificationLogin;
        if (this.notification.id !== null) {
            this.notificationService.update(this.notification).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
        else {
            this.notificationService.create(this.notification).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }
    private onSaveSuccess(result) {
        console.log('success_result',result);
        if(this.notification.id !== null){
            this.eventManager.broadcast({name: 'notificationEditInfo', content: result.status});
        }
        else{
            this.eventManager.broadcast({name: 'notificationListModification', content: result.status});
        }
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
