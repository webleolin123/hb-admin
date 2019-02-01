/**
 * Created by yl on 2018/5/28.
 */
import {Component, OnInit, OnDestroy,AfterViewInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {HelpRoles} from './help-roles.model';
import {HelpRolesService} from './help-roles.service';
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, UPLOAD_IMAGE_API, IMAGE_API_URL} from '../../../../app.constants';
import {Base64} from "js-base64";
import {BusinessModuleService} from "../../../authority/business-module/business-module.service";
declare var tinymce: any;
import {HttpResponse} from '@angular/common/http';
import {BusinessModule} from "../../../authority/business-module/business-module.model";
import * as $ from 'jquery';
@Component({
    selector: 'jhi-help-roles-mgmt-dialog',
    templateUrl: './help-roles-add.component.html'
})
export class HelpRolesAddComponent implements OnInit, OnDestroy,AfterViewInit {
    helpRoles: HelpRoles;
    // 编辑器
    editor: any;
    isSaving: Boolean;
    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + UPLOAD_IMAGE_API,
        method: 'POST',
        itemAlias: 'uploadedfile'
    });
    headers: Headers;
    imageUrl: string;
    imageMd5: string;
    validityPeriod: any;
    businessModules: BusinessModule[];
    bModule: BusinessModule;
    constructor(public activeModal: NgbActiveModal,
                private helpRolesService: HelpRolesService,
                private eventManager: JhiEventManager,
                private businessModuleService: BusinessModuleService) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.load();
    }

    load() {
        if (this.helpRolesService.helpRolesId) {
            this.helpRolesService.find(this.helpRolesService.helpRolesId).subscribe((response) => {
                this.helpRoles = response.body;
                this.validityPeriod = this.helpRoles.validityPeriod;
            })
        } else {
            this.helpRoles = new HelpRoles;
        }
        this.businessModuleService.getParentOrChildModules({
            level: 2
        }).subscribe(
            (res: HttpResponse<(BusinessModule)[]>) => {
                this.businessModules = res.body;
            }
        );
    }
    ngAfterViewInit() {
        if (this.helpRoles && this.helpRoles.answerblob) {
            tinymce.activeEditor.setContent(Base64.decode(this.helpRoles.answerblob));
        }
    }
    public fileInputChangeHandler(): void {
        const x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                const tempRes = JSON.parse(response);
                this.imageUrl = IMAGE_API_URL + tempRes.info.md5;
                this.imageMd5 = tempRes.info.md5;
                const tempInput = <HTMLInputElement>document.getElementById('temp');
                const fileInput = <HTMLInputElement>document.getElementById(tempInput.value);
                fileInput.value = this.imageUrl;
                // 此处做input上传组件的重置
                (<HTMLFormElement>document.getElementById("image_form")).reset();
            } else {
                // 上传文件后获取服务器返回的数据错误
                console.log(response);
            }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }
    ngOnDestroy() {
        // 销毁编辑器
        tinymce.remove(this.editor);
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    onSelectedModuleChange() {
        const x = $('#selectedModule').get(0).selectedIndex;
        if (x != 0) {
            this.bModule = this.businessModules[x - 1];
        } else {
            this.bModule = new BusinessModule;
        }
    }
    save() {
        this.helpRoles.answerblob = Base64.encode(tinymce.activeEditor.getContent());
        this.isSaving = true;
        this.helpRoles.status = 1;
        this.helpRoles.businessType = this.bModule.businessType;
        this.helpRoles.roleType = this.bModule.businessType;
        this.helpRoles.moduleId = this.bModule.id;
        this.helpRoles.answerblobContentType = 1;
        this.helpRoles.validityPeriod = Date.parse(this.validityPeriod) / 1000;
        if (this.helpRoles.id !== null) {
            this.helpRolesService.update(this.helpRoles).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.helpRolesService.create(this.helpRoles).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }
    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'helpRolesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }
    private onSaveError() {
        this.isSaving = false;
    }
}
