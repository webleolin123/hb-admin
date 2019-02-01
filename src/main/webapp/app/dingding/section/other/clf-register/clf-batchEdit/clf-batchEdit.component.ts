import { Component, OnInit,OnDestroy } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {
    WORKFLOW_CUO_LOU_FA_BatchEdit_API,
} from '../../../../../app.constants';
@Component({
  selector: 'clf-edit',
  templateUrl: './clf-batchEdit.component.html',
  styleUrls: []
})
export class ClfBatchEditComponent implements OnInit,OnDestroy  {
   clfInfos: ApproverCommonInfo;
   isSaving: Boolean;
   // 批量编辑 要传参数
    batchEditList:Array<number>;
    batchEditActionType:number;//批量编辑 要修改字段--帮助类型
    batchEditRemarks:string;//批量编辑 要修改字段--备注说明
    batchEditTreatment:string;//批量编辑 要修改字段--客服操作
    data:any;//用于保存批量编辑所需的对象参数
  constructor(
      public activeModal: NgbActiveModal,
      private clfService: MyHttpService,
      private eventManager: JhiEventManager,
      private alertService: JhiAlertService,
  ) {
      this.clfService.resourceUrl_batch_edit=WORKFLOW_CUO_LOU_FA_BatchEdit_API;
  }
  ngOnInit() {
      this.isSaving = false;
      this.batchEditList=this.clfService.list;
  }
  ngOnDestroy(){
  }
    clear() {
        this.activeModal.dismiss('cancle');
    }
    save() {
      //适用数据类型 string '0'或''  number 0 undefined null
        if(!this.batchEditActionType){
           this.batchEditActionType=0;
        }
        if(!this.batchEditRemarks){
            alert('请填写备注说明');
            return;
        }
        if(!this.batchEditTreatment){
            alert('请填写客服操作备注');
            return;
        }
        this.isSaving = true;
        if( this.isSaving){
            this.clfService.batch_update({
                list:this.batchEditList,
                actionType:Number(this.batchEditActionType),
                remarks:this.batchEditRemarks,
                treatment:this.batchEditTreatment,
            }).subscribe((response) => this.onSaveSuccess(response),
                (res: Response) => this.onSaveError(res.json()));
        }
    }
    private onSaveSuccess(response) {
        console.log(response);
        this.eventManager.broadcast({name: 'clfListModification', content: 'clfListBatch_edit'});
        this.isSaving = false;
        this.activeModal.dismiss(true);
    }
    private onSaveError(error) {
        this.isSaving = false;
        this.alertService.error(error.msg, error.message, null);
    }
}
