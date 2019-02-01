import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppraiseService} from './appraise.service';
import {JhiEventManager} from 'ng-jhipster';
import * as $ from 'jquery';
import {Shop} from "../../base-data/shop/shop.model";
import {ShopService} from "../../base-data/shop/shop.service";
import {HttpResponse} from '@angular/common/http';
@Component({
    selector: 'jhi-appraise-filter-dialog',
    templateUrl: './appraise-filter.component.html'
})
export class AppraiseFilterComponent implements OnInit {
    startTime: any;
    endTime: any;
    storeName:any= '爱宝乐母婴旗舰店';
    shops: Shop[];
    constructor(public activeModal: NgbActiveModal,
                private appraiseService: AppraiseService,
                private eventManager: JhiEventManager,
                private shopService: ShopService) {
    }
    ngOnInit() {
        this.shopService.queryShop({size: 99999}).subscribe(
            (res: HttpResponse<Shop[]>) => {
                this.shops = res.body;
            },
            (err) => alert(err));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    save() {
        if (this.startTime && this.endTime && this.storeName) {
            this.appraiseService.startTime = $('#startTime').val();
            this.appraiseService.endTime = $('#endTime').val();
            this.appraiseService.storeName = $('#storeName').val();
            this.eventManager.broadcast({name: 'appraiseTimeChooseDoneModification', content: 'OK'});
            this.clear();
        }
        else {
            alert('开始或结束时间不能为空！');
        }
    }
}
