import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {NbThemeService} from "@nebular/theme";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
// import {HbadminSharedModule} from '../../shared';
import {HbadminCoreModule} from '../../core';
// import {HbadminSharedCommonModule} from '../../shared';
import {FileUploadModule} from 'ng2-file-upload';
import {ToasterService, ToasterModule} from 'angular2-toaster';
import {DevManageModule} from './dev-manage/dev-manage.module';
import {SalesManageModule} from './sales-manage/sales-manage.module';
import {OtherModule} from './other/other.module';
import {BaseDataModule} from './base-data/base-data.module';
import {DictService} from '../../systems/system/dict/dict.service';
import {ZhiTongCheAddComponent} from "./sales-manage/business/zhi-tong-che/zhi-tong-che-add.component";
import {ZhiTongCheDetailComponent} from "./sales-manage/business/zhi-tong-che/zhi-tong-che-detail.component";
import {ZuanZhanAddComponent} from "./sales-manage/business/zuan-zhan/zuan-zhan-add.component";
import {ZuanZhanDetailComponent} from "./sales-manage/business/zuan-zhan/zuan-zhan-detail.component";
import {TaoKeAddComponent} from "./sales-manage/business/tao-ke/tao-ke-add.component";
import {TaoKeDetailComponent} from "./sales-manage/business/tao-ke/tao-ke-detail.component";
import {MessageAddComponent} from "./sales-manage/business/message/message-add.component";
import {MessageDetailComponent} from "./sales-manage/business/message/message-detail.component";
import {DaRenAddComponent} from "./sales-manage/business/da-ren/da-ren-add.component";
import {DaRenDetailComponent} from "./sales-manage/business/da-ren/da-ren-detail.component";
import {PriceAddComponent} from "./sales-manage/productManage/price/price-add.component";
import {PriceDetailComponent} from "./sales-manage/productManage/price/price-detail.component";
import {PreSaleAddComponent} from "./sales-manage/productManage/pre-sale/pre-sale-add.component";
import {PreSaleDetailComponent} from "./sales-manage/productManage/pre-sale/pre-sale-detail.component";
import {LoadUploadAddComponent} from "./sales-manage/productManage/load-upload/load-upload-add.component";
import {LoadUploadDetailComponent} from "./sales-manage/productManage/load-upload/load-upload-detail.component";
import {StockTransferAddComponent} from "./sales-manage/productManage/stock-transfer/stock-transfer-add.component";
import {StockTransferDetailComponent} from "./sales-manage/productManage/stock-transfer/stock-transfer-detail.component";
import {GiftAddComponent} from "./sales-manage/cuxiaoManage/gift/gift-add.component";
import {GiftDetailComponent} from "./sales-manage/cuxiaoManage/gift/gift-detail.component";
import {FullReduceAddComponent} from "./sales-manage/cuxiaoManage/full-reduce/full-reduce-add.component";
import {FullReduceDetailComponent} from "./sales-manage/cuxiaoManage/full-reduce/full-reduce-detail.component";
import {CouponsAddComponent} from "./sales-manage/cuxiaoManage/coupons/coupons-add.component";
import {CouponsDetailComponent} from "./sales-manage/cuxiaoManage/coupons/coupons-detail.component";
import {MyHttpService} from '../../common/http/myHttp.service';
@NgModule({
    imports: [
        ThemeModule,
        CommonModule,
        // HbadminSharedModule,
        HbadminCoreModule,
        // HbadminSharedCommonModule,
        FileUploadModule,
        ToasterModule,
        DevManageModule,
        SalesManageModule,
        OtherModule,
        BaseDataModule,
    ],
    declarations: [
    ],
    entryComponents: [
        ZhiTongCheAddComponent,
        ZhiTongCheDetailComponent,
        ZuanZhanAddComponent,
        ZuanZhanDetailComponent,
        TaoKeAddComponent,
        TaoKeDetailComponent,
        MessageAddComponent,
        MessageDetailComponent,
        DaRenAddComponent,
        DaRenDetailComponent,
        PriceAddComponent,
        PriceDetailComponent,
        LoadUploadAddComponent,
        LoadUploadDetailComponent,
        PreSaleAddComponent,
        PreSaleDetailComponent,
        GiftAddComponent,
        GiftDetailComponent,
        FullReduceAddComponent,
        FullReduceDetailComponent,
        CouponsAddComponent,
        CouponsDetailComponent,
        StockTransferAddComponent,
        StockTransferDetailComponent,
    ],
    providers: [
        ToasterService,
        DictService,
        NbThemeService,
        NgbModal,
        MyHttpService
    ]
})
export class SectionModule {
}
