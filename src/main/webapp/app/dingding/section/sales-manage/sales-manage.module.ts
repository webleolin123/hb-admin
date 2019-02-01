import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from '../../../@theme/theme.module';
import {HbadminSharedModule} from '../../../shared';
import {HbadminCoreModule} from '../../../core';
import {HbadminSharedCommonModule} from '../../../shared';
import {Routes, RouterModule} from '@angular/router';
import {
    SalesManageContainerComponent,
    salesManageRoute,
    salesManageComponent,
    salesProjectRoute,
    salesProjectComponent,
    SaleService,
    actionProcessComponent,
    actionProcessRoute,
    daRenComponent,
    daRenRoute,
    messageComponent,
    messageRoute,
    taoKeComponent,
    taoKeRoute,
    zhiTongCheComponent,
    zhiTongCheRoute,
    zuanZhanComponent,
    zuanZhanRoute,
    ActionProcessService,
    DaRenService,
    TaoKeService,
    ZhiTongCheService,
    ZuanZhanService,
    MessageService,
    giftRoute,
    fullReduceRoute,
    couponsRoute,
    whitelistRoute,
    amoySnapRoute,
    polyCostRoute,
    othersRoute,
    weChatPromotionRoute,
    customerPromotionRoute,
    eventSaveRoute,
    priceRoute,
    preSaleRoute,
    loadUploadRoute,
    stockTransferRoute,
    stockTransferComponent,
    loadUploadComponent,
    preSaleComponent,
    priceComponent,
    PriceService,
    eventSaveComponent,
    customerPromotionComponent,
    othersComponent,
    polyCostComponent,
    amoySnapComponent,
    whitelistComponent,
    couponsComponent,
    fullReduceComponent,
    giftComponent,
    salesPlanRoute,
    shopAdResourceRoute,
    salesPlanComponent,
    shopAdResourceComponent,
    ShelvesService,
} from "./";
import {WeChatPromotionComponent} from "./activityManage/WeChat-promotion/WeChat-promotion.component";
const SalesManage_COMPONENTS = [
    SalesManageContainerComponent,
    salesManageComponent,
    salesProjectComponent,
    actionProcessComponent,
    daRenComponent,
    messageComponent,
    taoKeComponent,
    zhiTongCheComponent,
    zuanZhanComponent,
    stockTransferComponent,
    loadUploadComponent,
    preSaleComponent,
    priceComponent,
    eventSaveComponent,
    customerPromotionComponent,
    WeChatPromotionComponent,
    othersComponent,
    polyCostComponent,
    amoySnapComponent,
    whitelistComponent,
    couponsComponent,
    fullReduceComponent,
    giftComponent,
    salesPlanComponent,
    shopAdResourceComponent,
];
const routes: Routes = [
    {
        path: '',
        component: SalesManageContainerComponent,
        children: [
            ...salesManageRoute,
            ...salesProjectRoute,
            ...actionProcessRoute,
            ...daRenRoute,
            ...messageRoute,
            ...taoKeRoute,
            ...zhiTongCheRoute,
            ...zuanZhanRoute,
            ...giftRoute,
            ...fullReduceRoute,
            ...couponsRoute,
            ...whitelistRoute,
            ...amoySnapRoute,
            ...polyCostRoute,
            ...othersRoute,
            ...weChatPromotionRoute,
            ...customerPromotionRoute,
            ...eventSaveRoute,
            ...priceRoute,
            ...preSaleRoute,
            ...loadUploadRoute,
            ...stockTransferRoute,
            ...salesPlanRoute,
            ...shopAdResourceRoute,
        ],
    },
];
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    HbadminSharedModule,
      HbadminCoreModule,
    HbadminSharedCommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...SalesManage_COMPONENTS],
  providers:[
      SaleService,
      ActionProcessService,
      DaRenService,
      MessageService,
      TaoKeService,
      ZhiTongCheService,
      ZuanZhanService,
      PriceService,
      ShelvesService,
  ]
})
export class SalesManageModule { }
