import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Good} from './good.model';
import {GoodService} from './good.service';
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, UPLOAD_IMAGE_API, IMAGE_API_URL} from '../../../../app.constants';
import {Brand} from "../shop/brand.model";
import {Shop} from "../shop/shop.model";
import {BrandService} from "../brand/brand.service";
import {ShopService} from "../shop/shop.service";
@Component({
    selector: 'jhi-good-mgmt-dialog',
    templateUrl: './good-add.component.html'
})
export class GoodAddComponent implements OnInit {

    good: Good;
    brands: Brand[];
    shops: Shop[];
    isSaving: Boolean;
    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + UPLOAD_IMAGE_API,
        method: 'POST',
        itemAlias: 'uploadedfile'
    });
    headers: Headers;
    imageUrl: string;
    imageMd5: string;

    constructor(public activeModal: NgbActiveModal,
                private goodService: GoodService,
                private brandService: BrandService,
                private shopService: ShopService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.load();
    }

    load() {
        this.brandService.query({size: 99999}).subscribe((res) => {
            this.brands = res.body;
        });
        this.shopService.query({size: 99999}).subscribe((res) => {
            this.shops = res.body
        })
        if (this.goodService.goodId) {
            this.goodService.find(this.goodService.goodId).subscribe((response) => {
                this.good = response.body;
                console.log(response);
            })
        } else {
            this.good= new Good;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.good.status = 1;
        if (this.good.id !== null) {
            this.goodService.update(this.good).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.goodService.create(this.good).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'goodListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    selectedFileOnChanged() {
        let x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            console.log(response);
            console.log(status);
            console.log(headers);
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                let tempRes = JSON.parse(response);
                this.imageUrl = IMAGE_API_URL + tempRes.info.md5;
                this.imageMd5 = tempRes.info.md5;
                console.log(this.imageMd5)
            } else {
                // 上传文件后获取服务器返回的数据错误
                console.log(response);
            }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }
}
