import { Component, OnInit,OnDestroy } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService,JhiEventManager} from "ng-jhipster";
import {HttpResponse} from "@angular/common/http";
import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {
    WORKFLOW_CUO_LOU_FA_Export_API,
} from '../../../../../app.constants';
//调用公共方法类
import {CommonMethodsService} from "../../../../../common/methods/commonMethods.service";
@Component({
  selector: 'clf-export',
  templateUrl: './clf-export.component.html',
  styles: []
})
export class ClfExportComponent implements OnInit,OnDestroy {
    clfInfos: ApproverCommonInfo;
    isSaving: Boolean;
    startTime: any;
    endTime: any;
    exportDatas: any;
    array: any;
    data: any;
    constructor(
        public activeModal: NgbActiveModal,
        private clfService: MyHttpService,
        private eventManager: JhiEventManager,
        private commonMethodsService: CommonMethodsService,
        private alertService: JhiAlertService,
    ) {
        this.clfService.exportUrl=WORKFLOW_CUO_LOU_FA_Export_API;
    }
    ngOnInit() {
        this.isSaving = false;
    }
    ngOnDestroy() {
    }
    clear() {
        this.activeModal.dismiss('cancle');
    }
    save() {
        this.isSaving = false;
        if(!this.startTime){
            alert('请选择开始时间');
            return
        }
        if(!this.endTime){
            alert('请选择结束时间');
            return
        }
        if(this.endTime<this.startTime){
            alert('结束时间不小于开始时间');
            return
        }
        this.isSaving = true;
        if (this.isSaving) {
            this.clfService.export({
                startTime: this.startTime,
                endTime: this.endTime,
            })
            .subscribe(
                (res: HttpResponse<(ApproverCommonInfo)[]>) => {
                    this.onSaveSuccess(res);
                  },
                (res: Response) => this.onError(res.json()));
        }
    }
    private onQueryExportDataSuccess(data) {
        console.log('exportDatas', data);
        // this.exportDatas = data.content;
        this.exportDatas = data;
        // 注意一定要初始化 this.array
        this.array = [];
        this.exportDatas.forEach((value, index, array) => {
            this.data = {
                num1: value.id,
                num2: value.taoBaoId,
                num3: value.orderId,
                num4: value.telephone,
                num5: this.commonMethodsService.myFilter('problemType', value.problemType),
                num6: this.commonMethodsService.myFilter('helpType', value.helpType),
                num7: value.problemInstruction,
                num8: this.commonMethodsService.myFilter('createdDate', value.createdDate),
                num9: this.commonMethodsService.myFilter('status', value.status),
                num10: this.commonMethodsService.myFilter('actionType', value.actionType),
                num11: value.remarks,
                num12: value.treatment,
                num13: this.commonMethodsService.myFilter('image', value.image),
            };
            this.array.push(this.data);
        });
        this.commonMethodsService.exportCsv({
            title: ["id", "淘宝ID", "订单号", "电话号码", '问题类型', "帮助类型", "问题说明", "提交时间", "状态", "处理方式", "备注说明", "客服操作备注",'图片请求地址'],
            titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num10", "num11", "num12",'num13'],
            data: this.array
        }, "错漏发登记管理.csv");
    }

    private onSaveSuccess(res) {
        this.onQueryExportDataSuccess(res.body)
        console.log(res);
        this.eventManager.broadcast({name: 'clfListModification', content:'clfExportInfo'});
        this.isSaving = false;
        this.activeModal.dismiss(true);
    }
    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
