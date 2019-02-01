/**
 * Created by Administrator on 2018/7/4.
 */
import {Component, OnInit} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'jhi-message-detail',
    templateUrl: './message-detail.component.html',
    styleUrls: ['../../../../content/scss/detail.scss']
})
export class MessageDetailComponent implements OnInit {
    message: Message;
    baseImageUrl: any;

    constructor(private messageService: MessageService,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {

    }

    ngOnInit() {
        if (this.messageService.messageId) {
            this.messageService.find(this.messageService.messageId).subscribe(
                (res: HttpResponse<Message>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }

    private onSuccess(data) {
        console.log(data);
        this.message = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}

