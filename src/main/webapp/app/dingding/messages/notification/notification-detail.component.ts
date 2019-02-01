/**
 * Created by Administrator on 2018/9/17.
 */
import {Component, OnInit} from '@angular/core';
import {Notification} from './notification.model';
import {NotificationService} from './notification.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'jhi-notification-detail',
    templateUrl: './notification-detail.component.html',
    styleUrls: ['../../../../content/css/view.css']
})
export class NotificationDetailComponent implements OnInit {
    notification: Notification;
    baseImageUrl: any;

    constructor(private notificationService: NotificationService,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {

    }

    ngOnInit() {
        if (this.notificationService.notificationId) {
            this.notificationService.find(this.notificationService.notificationId).subscribe(
                (res: HttpResponse<Notification>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }

    private onSuccess(data) {
        console.log('onSuccess_detail',data);
        this.notification = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}

