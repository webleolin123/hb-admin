import {Component, OnInit} from '@angular/core';
import {HelpRolesService} from "./help-roles.service";
import {HelpRoles} from "./help-roles.model";
import {JhiAlertService} from "ng-jhipster";
import {HttpResponse} from '@angular/common/http';
import {Base64} from "js-base64";
import {DomSanitizer} from '@angular/platform-browser';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector: 'jhi-help-roles-detail',
    templateUrl: './help-roles-detail.component.html',
    styleUrls: ['../../../../../content/scss/detail.scss']
})
export class HelpRolesDetailComponent implements OnInit {

    helpRoles: HelpRoles;
    businessType: any;

    constructor(private helpRolesService: HelpRolesService,
                private alertService: JhiAlertService,
                private sanitizer: DomSanitizer,
                public activeModal: NgbActiveModal,) {
    }

    ngOnInit() {
        if (this.helpRolesService.helpRolesId) {
            this.helpRolesService.find(this.helpRolesService.helpRolesId).subscribe(
                (res: HttpResponse<HelpRoles>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res)
            )
        }
    }

    onSuccess(data) {
        console.log(data);
        this.helpRoles = data;
    }

    onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    Base64Decode(content) {
        let result = Base64.decode(content);
        return result;
    }

    bypassSecurityTrustHtml(data) {
        return this.sanitizer.bypassSecurityTrustHtml(data);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
