/**
 * Created by Administrator on 2018/7/5.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {BaiduSmsService} from './baidu-sms.service';
import {BaiduSms} from './baidu-sms.model';
@Component({
    selector: 'jhi-baidu-sms-add',
    templateUrl: './baidu-sms-add.component.html',
})
export class BaiduSmsAddComponent implements OnInit {

    baiduSms: BaiduSms;
    isSaving: boolean;

    // 创建标签
    tagName: string;
    deviceType: any;

    isCreateTag: boolean = false;

    constructor(public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager,
                public baiduSmsService: BaiduSmsService) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.load();
    }

    load() {
        if (this.baiduSmsService.baiduSmsId) {
            this.baiduSmsService.find(this.baiduSmsService.baiduSmsId).subscribe((response) => {
                this.baiduSms = response.body;
            })
        } else {
            this.baiduSms = new BaiduSms;
        }
    }

    clear() {
        this.activeModal.dismiss('cancle');
    }

    createPush() {
        this.isCreateTag = false;
    }

    createTag() {
        this.isCreateTag = true;
    }

    save() {
        if (this.isCreateTag) {
            // 创建标签
            if (this.deviceType) {
                this.baiduSmsService.createTag(this.tagName, this.deviceType).subscribe((res) => {
                    alert('创建标签成功~');
                    this.clear();
                })
            }
        } else {
            // 创建推送
            this.baiduSms.status = 1;
            if (this.baiduSms.deviceType) {
                if (this.baiduSms.kind) {
                    if (this.baiduSms.userType == 1 || this.baiduSms.userType == null) {
                        this.baiduSmsService.push2all(
                            this.baiduSms.title,
                            this.baiduSms.content,
                            this.baiduSms.custom,
                            this.baiduSms.kind,
                            this.baiduSms.deviceType,
                            1
                        ).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
                    } else {
                        this.baiduSmsService.push2tag(
                            this.tagName,
                            this.baiduSms.title,
                            this.baiduSms.content,
                            this.baiduSms.custom,
                            this.baiduSms.kind,
                            this.baiduSms.deviceType,
                            1
                        ).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
                    }
                }
            }
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'baiduSmsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(true);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
