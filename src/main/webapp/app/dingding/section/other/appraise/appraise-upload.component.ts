/**
 * Created by Administrator on 2018/7/19.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppraiseService} from './appraise.service';
import {BASE_API_URL, WORKFLOW_UPLOAD_PARSE_HTML_API} from '../../../../app.constants';

import {JhiEventManager} from 'ng-jhipster';
import * as $ from 'jquery';
import {FileUploader} from "ng2-file-upload";
import {Shop} from "../../base-data/shop/shop.model";
import {ShopService} from "../../base-data/shop/shop.service";
import {ToasterService, ToasterConfig, Toast, BodyOutputType} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
    selector: 'jhi-appraise-upload-dialog',
    templateUrl: './appraise-upload.component.html'
})

export class AppraiseUploadComponent implements OnInit {
    storeName: string = '爱宝乐母婴旗舰店';
    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + WORKFLOW_UPLOAD_PARSE_HTML_API + '?storeName=' + this.storeName,
    });
    shops: Shop[];

    constructor(public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager,
                private shopService: ShopService,
                private toasterService: ToasterService,) {
    }

    ngOnInit() {
        this.shopService.query({size: 99999}).subscribe((res) => {
            this.shops = res.body
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    selectedFileOnChanged() {
        this.uploader.setOptions({
            url: BASE_API_URL + WORKFLOW_UPLOAD_PARSE_HTML_API + '?storeName=' + this.storeName,
        });
        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (status == 200) {
                var toast: Toast = {
                    type: 'default',
                    title: '文件：' + item.file.name + '上传成功',
                    body: '上传文件数：' + parseInt(response.split(',')[1]),
                    timeout: 2000,
                    showCloseButton: true,
                    bodyOutputType: BodyOutputType.TrustedHtml,
                };
                this.toasterService.popAsync(toast);
            } else {
                alert('上传失败：' + JSON.stringify(response));
            }
        };
        this.uploader.uploadAll();
        this.eventManager.subscribe('appraiseListModification', this.clear());
    }

    save(){

    }
}
