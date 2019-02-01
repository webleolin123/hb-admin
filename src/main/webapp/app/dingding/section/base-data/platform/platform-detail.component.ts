import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Platform} from './platform.model';
import {PlatformService} from './platform.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector: 'jhi-platform-detail',
    templateUrl: './platform-detail.component.html',
    styleUrls: ['../../../../../content/scss/detail.scss']
})
export class PlatformDetailComponent implements OnInit {
    platform: Platform;

    constructor(private platformService: PlatformService,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {

    }

    ngOnInit() {
        if (this.platformService.platformId) {
            this.platformService.find(this.platformService.platformId).subscribe(
                (res: HttpResponse<Platform>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }

    private onSuccess(data) {
        this.platform = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
