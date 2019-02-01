import { Component, OnInit,OnDestroy } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService,JhiEventManager} from "ng-jhipster";
import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {
    WORKFLOW_CUO_LOU_FA_API,
} from '../../../../../app.constants';
@Component({
  selector: 'clf-edit',
  templateUrl: './clf-edit.component.html',
  styleUrls: []
})
export class ClfEditComponent implements OnInit,OnDestroy  {
   clfInfos: ApproverCommonInfo;
   isSaving: Boolean;
  constructor(
      public activeModal: NgbActiveModal,
      private clfService: MyHttpService,
      private eventManager: JhiEventManager,
      private alertService: JhiAlertService,
  ) {
      this.clfService.resourceUrl=WORKFLOW_CUO_LOU_FA_API;
  }
  ngOnInit() {
      this.isSaving = false;
      this.load();
  }
  ngOnDestroy(){
  }
    load() {
        this.clfService.find(this.clfService.approverCommonId).subscribe((response) => {
            this.clfInfos = response.body;
        })
    }
    clear() {
        this.activeModal.dismiss('cancle');
    }
    save() {
        this.isSaving = false;
        if(this.clfInfos.problemType==0){
            alert('请选择问题类型');
            return;
        }
        if(this.clfInfos.helpType==0){
            alert('请选择帮助类型');
            return;
        }
        this.isSaving = true;
        if( this.isSaving){
            this.clfService.update(this.clfInfos).subscribe((response) => this.onSaveSuccess(response),
                (res:Response) => this.onSaveError(res.json()));
        }
    }
    private onSaveSuccess(response) {
        console.log(response);
        this.eventManager.broadcast({name: 'clfListModification', content: 'clfListEdit'});
        this.isSaving = false;
        this.activeModal.dismiss(true);
    }
    private onSaveError(error) {
        this.isSaving = false;
        this.alertService.error(error.error, error.message, null);
    }
}
