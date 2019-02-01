import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Shop} from './shop.model';
import {ShopService} from './shop.service';
import {PlatformService} from '../platform/platform.service';
import {Platform} from '../platform/platform.model';
@Component({
    selector: 'jhi-shop-mgmt-dialog',
    templateUrl: './shop-add.component.html'
})
export class ShopAddComponent implements OnInit {

    shop: Shop;
    platforms: Platform[];
    isSaving: Boolean;

    constructor(public activeModal: NgbActiveModal,
                private shopService: ShopService,
                private eventManager: JhiEventManager,
                private platformService: PlatformService) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.load();
    }

    load() {
        this.platformService.query({size:999999}).subscribe(platforms => {
            this.platforms = platforms.body;
        });
        if (this.shopService.shopId) {
            this.shopService.find(this.shopService.shopId).subscribe((response) => {
                this.shop = response.body;
                console.log(response);
            })
        } else {
            this.shop = new Shop;
        }
    }

    onSelectedPlatform(event) {

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.shop.status = 1;
        console.log(this.shop);
        if (this.shop.id !== null) {
            this.shopService.update(this.shop).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.shopService.create(this.shop).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'shopListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
