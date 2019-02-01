import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Good} from '../good/good.model';
import {GoodService} from '../good/good.service';
import {Brand} from "../shop/brand.model";
import {Shop} from "../shop/shop.model";
import {BrandService} from "../brand/brand.service";
import {ShopService} from "../shop/shop.service";
import {GoodSku} from './good-sku.model';
import {GoodSkuService} from './good-sku.service';
@Component({
    selector: 'jhi-good-sku-dialog',
    templateUrl: './good-sku-add.component.html'
})
export class GoodSkuAddComponent implements OnInit {
    goodSku: GoodSku;
    goods: Good[];
    brands: Brand[];
    shops: Shop[];
    isSaving: Boolean;
    selectedBrandId:any=0;//选择品牌的id
    selectedShopId:any=0;//选择店铺的id
    selectedSKUGoodId:any=0;//选择SKU商品的id
    data:any;
    constructor(public activeModal: NgbActiveModal,
                private goodService: GoodService,
                private brandService: BrandService,
                private shopService: ShopService,
                private eventManager: JhiEventManager,
                private goodSkuService: GoodSkuService) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.load();
    }
    load() {
        this.brandService.query({size: 99999}).subscribe((res) => {
            this.data=res.body;
            this.brands = this.data.content;
        });
        this.shopService.query({size: 99999}).subscribe((res) => {
            this.shops = res.body
        });
        if (this.goodSkuService.goodSkuId) {
            this.goodSkuService.find(this.goodSkuService.goodSkuId).subscribe((response) => {
                this.goodSku = response.body;
                console.log(response);
            })
        } else {
            this.goodSku = new GoodSku;
        }
    }
    loadGood() {
        if (this.selectedShopId && this.selectedBrandId) {
            this.shopService.queryByShopIdAndBrandId({
                brandId: this.selectedBrandId,
                shopId: this.selectedShopId
            }).subscribe((res) => {
                this.data=res.body;
                this.goods = this.data.content;
            });
        } else {
            alert('请先选择店铺和品牌');
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    selectedShop() {
        console.log(this.selectedShopId);
        this.selectedBrandId = null;
    }
    selectedBrand() {
        if (this.selectedShopId == '0') {
            alert('请先选择店铺!');
        } else {
            this.loadGood();
        }
    }
    selectedGood() {
        // if(this.goodSku.goodId){
        //     this.goodService.find(this.goodSku.goodId).subscribe((res)=>{
        //         this.goodSku.goodName = res.body.goodName;
        //     })
        // }
        console.log(this.goodSku.goodId);
    }
    save() {
        this.isSaving = true;
        this.goodSku.status = 1;
        if (this.goodSku.id !== null) {
            this.goodSkuService.update(this.goodSku).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.goodSkuService.create(this.goodSku).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }
    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'goodSkuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }
    private onSaveError() {
        this.isSaving = false;
    }
}
