import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Brand} from './brand.model';
import {BrandService} from './brand.service';
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, TASK_FILR_UPLOAD_API, IMAGE_API_URL} from '../../../../app.constants';
@Component({
    selector: 'jhi-brand-mgmt-dialog',
    templateUrl: './brand-add.component.html'
})
export class BrandAddComponent implements OnInit {
    broadcastContent:any;
    isAgencyBrand:any;
    brand: Brand;
    isSaving: Boolean;
    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + TASK_FILR_UPLOAD_API,
        method: 'POST',
        itemAlias: 'uploadedfile'
    });
    headers: Headers;
    imageUrl: string;
    imageMd5: string;
    constructor(
        public activeModal: NgbActiveModal,
        private brandService: BrandService,
        private eventManager: JhiEventManager,) {
    }

    ngOnInit() {
        this.broadcastContent='';
        this.isSaving = false;
        this.load();
    }
    load() {
        if (this.brandService.brandId) {
            this.brandService.find(this.brandService.brandId).subscribe((response) => {
                this.brand = response.body;
                this.isAgencyBrand=this.brand.isAgencyBrand;
                console.log(response);
            })
        } else {
            this.brand = new Brand;
            this.isAgencyBrand=0;
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    save() {
        this.brand.isAgencyBrand=this.isAgencyBrand;
        if(!this.brand.brandName||this.brand.brandName==''){
            alert('请填写品牌名称');
            return
        }
        if(!this.brand.isAgencyBrand||this.brand.isAgencyBrand=='0'){
            alert('请选择是否代理');
            return;
        }
        this.isSaving = true;
        this.brand.status = 1;
        if (this.brand.id) {
            this.brandService.update(this.brand).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.brandService.create(this.brand).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }
    private onSaveSuccess(result) {
        if(this.brand.id){
            this.broadcastContent='Edit a brand';
        }
        else{
            this.broadcastContent='Create a brand';
        }
        this.eventManager.broadcast({name: 'brandListModification', content:this.broadcastContent});
        this.isSaving = false;
        this.activeModal.dismiss(true);
    }
    private onSaveError() {
        this.isSaving = false;
    }
    selectedFileOnChanged() {
        const x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            console.log(response);
            console.log(status);
            console.log(headers);
            // 上传文件成功
            // if (status == 200) {
            //     // 上传文件后获取服务器返回的数据
            //     let tempRes = JSON.parse(response);
            //     this.imageUrl = IMAGE_API_URL + tempRes.info.md5;
            //     this.imageMd5 = tempRes.info.md5;
            //     console.log(this.imageMd5)
            // } else {
            //     // 上传文件后获取服务器返回的数据错误
            //     console.log(response);
            // }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }
}
