/**
 * Created by Administrator on 2018/8/2.
 */
import {Component, OnInit,Input} from '@angular/core';
import {Authority} from './authority.model';
import {AuthorityService} from './authority.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector: 'jhi-authority-detail',
    templateUrl: './authority-detail.component.html',
    styleUrls: ['../../../../content/scss/detail.scss']
})
export class AuthorityDetailComponent implements OnInit {
    @Input() dingName:string;
    authority: Authority;
    constructor(private authorityService: AuthorityService,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {
    }
    ngOnInit() {
        if (this.authorityService.authorityId) {
            this.authorityService.find(this.authorityService.authorityId).subscribe(
                (res: HttpResponse<Authority>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }
    private onSuccess(data) {
        this.authority = data;
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
}
