/**
 * Created by Administrator on 2018/7/31.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {BusinessModule} from './business-module.model';
import {BusinessModuleService} from './business-module.service';
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, UPLOAD_IMAGE_API, IMAGE_API_URL} from '../../../app.constants';

@Component({
    selector: 'ngx-business-module-add',
    templateUrl: './business-module-add.component.html'
})
export class BusinessModuleAddComponent implements OnInit {

    businessModule: BusinessModule;
    isSaving: Boolean;
    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + UPLOAD_IMAGE_API,
        method: 'POST',
        itemAlias: 'uploadedfile'
    });
    headers: Headers;

    imageUrl: string; // logo
    imageMd5: string;

    greyLogoImageUrl: string; // greyLogo
    greyLogoImageMd5: string;

    serverLogoImageUrl: string; // serverLogo
    serverLogoImageMd5: string;

    baseImageUrl: any;

    firstModules: BusinessModule[];
    secondModules: BusinessModule[];

    parentModulesIds: any;

    constructor(public activeModal: NgbActiveModal,
                private businessModuleService: BusinessModuleService,
                private eventManager: JhiEventManager,) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.baseImageUrl = IMAGE_API_URL;
        this.businessModule = new BusinessModule;
        this.load();
    }

    load() {
        if (this.businessModuleService.businessModuleId) {
            this.businessModuleService.find(this.businessModuleService.businessModuleId).subscribe((response) => {
                this.businessModule = response.body;
                this.imageUrl = IMAGE_API_URL + this.businessModule.clientLogo;
                this.imageMd5 = this.businessModule.clientLogo;
                this.greyLogoImageUrl = IMAGE_API_URL + this.businessModule.greyCLogo;
                this.greyLogoImageMd5 = this.businessModule.greyCLogo;
                this.serverLogoImageUrl = IMAGE_API_URL + this.businessModule.serverLogo;
                this.serverLogoImageMd5 = this.businessModule.serverLogo;
            })
        } else {
            this.businessModule = new BusinessModule;
        }

        this.businessModuleService.getParentOrChildModules({level: 0}).subscribe((response) => {
            this.firstModules = response.body;
        })

        this.businessModuleService.getParentOrChildModules({level: 1}).subscribe((response) => {
            this.secondModules = response.body;
        })
    }

    selectedFileOnChanged1() {
        let x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                let tempRes = JSON.parse(response);
                this.imageUrl = IMAGE_API_URL + tempRes.info.md5;
                this.imageMd5 = tempRes.info.md5;
            } else {
                // 上传文件后获取服务器返回的数据错误
                console.log(response);
            }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }

    selectedFileOnChanged2() {
        let x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                let tempRes = JSON.parse(response);
                this.greyLogoImageUrl = IMAGE_API_URL + tempRes.info.md5;
                this.greyLogoImageMd5 = tempRes.info.md5;
            } else {
                // 上传文件后获取服务器返回的数据错误
                console.log(response);
            }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }

    selectedFileOnChanged3() {
        let x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                let tempRes = JSON.parse(response);
                this.serverLogoImageUrl = IMAGE_API_URL + tempRes.info.md5;
                this.serverLogoImageMd5 = tempRes.info.md5;
            } else {
                // 上传文件后获取服务器返回的数据错误
                console.log(response);
            }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }

    clear() {
        this.activeModal.dismiss('cancle');
    }

    save() {
        this.isSaving = true;
        this.businessModule.clientLogo = this.imageMd5;
        this.businessModule.greyCLogo = this.greyLogoImageMd5;
        this.businessModule.serverLogo = this.serverLogoImageMd5;

        this.parentModulesIds = [];
        if(this.businessModule.level == 1){
            this.firstModules.forEach((firstModule)=>{
                if(firstModule.isSelected == true){
                    this.parentModulesIds.push(firstModule.id);
                }
            });
        }
        else if(this.businessModule.level == 2){
            this.secondModules.forEach((secondModule)=>{
                if(secondModule.isSelected == true){
                    this.parentModulesIds.push(secondModule.id);
                }
            });
        }
        if (this.businessModule.id !== null) {
            this.businessModuleService.update(this.businessModule).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.businessModuleService.create(this.businessModule).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        if(result.body.level == 1){
            this.businessModuleService.addChildRelationship(this.parentModulesIds.toString(), result.body.id).subscribe((res) => {
                this.eventManager.broadcast({name: 'businessModuleListModification', content: 'OK'});
                this.isSaving = false;
            })
        }else if (result.body.level == 2) {
            this.businessModuleService.addChildRelationship(this.parentModulesIds.toString(), result.body.id).subscribe((res) => {
                this.eventManager.broadcast({name: 'businessModuleListModification', content: 'OK'});
                this.isSaving = false;
            })
        } else {
            this.eventManager.broadcast({name: 'businessModuleListModification', content: 'OK'});
            this.isSaving = false;
        }
        this.activeModal.dismiss(true);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}
