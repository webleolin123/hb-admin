import { Component, OnInit,OnDestroy } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MyHttpService} from "../../../../common/http/myHttp.service";
import {ApproverInfo} from "../../../../common/http/approver-info.model";
import {
    WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API,
} from '../../../../app.constants';
@Component({
    selector: 'personnel-detail',
    templateUrl: './personnel-manage-detail.component.html',
    styleUrls: ['../../../../../content/css/view.css']
})
export class PersonnelManageDetailComponent implements OnInit,OnDestroy  {
    personnelInfo: ApproverInfo;
    constructor(
        public activeModal: NgbActiveModal,
        private personnelService: MyHttpService,
    ) {
        this.personnelService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API;
    }
    ngOnInit() {
        this.load();
    }
    ngOnDestroy(){
    }
    load() {
        this.personnelService.find(this.personnelService.approverCommonId).subscribe((response) => {
            this.personnelInfo = response.body;
            console.log(this.personnelInfo);
        })
    }
    clear() {
        this.activeModal.dismiss('cancle');
    }
}
