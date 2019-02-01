import { Component, OnInit,OnDestroy } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {
    WORKFLOW_CUO_LOU_FA_API,
} from '../../../../../app.constants';
@Component({
  selector: 'clf-view',
  templateUrl: './clf-detail.component.html',
  styleUrls: ['../../../../../../content/css/view.css']
})
export class ClfDetailComponent implements OnInit,OnDestroy  {
    clfInfos: ApproverCommonInfo;
    constructor(
        public activeModal: NgbActiveModal,
        private clfService: MyHttpService,
    ) {
        this.clfService.resourceUrl=WORKFLOW_CUO_LOU_FA_API;
    }
  ngOnInit(){
      this.load();
  }
  ngOnDestroy(){
}
  load(){
        this.clfService.find(this.clfService.approverCommonId).subscribe((response) => {
            this.clfInfos = response.body;
            if(this.clfInfos.image){
                this.clfInfos.imageArr= this.clfInfos.image.split(',');
                if(this.clfInfos.imageArr>5){
                    this.clfInfos.imageArr.length=5;
                }
            }
        })
    }
    clear() {
        this.activeModal.dismiss('cancle');
    }
}
