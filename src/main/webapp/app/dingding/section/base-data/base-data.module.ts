import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from '../../../@theme/theme.module';
import {HbadminSharedModule} from '../../../shared';
import {HbadminCoreModule} from '../../../core';
import {HbadminSharedCommonModule} from '../../../shared';
import {FileUploadModule} from 'ng2-file-upload';
import {Routes, RouterModule} from '@angular/router';
import {
    BaseDataComponent,
    brandComponent,
    brandRoute,
    BrandService,
    goodComponent,
    goodRoute,
    GoodService,
    goodSkuComponent,
    goodSkuRoute,
    GoodSkuService,
    helpRolesComponent,
    helpRolesRoute,
    HelpRolesService,
    platformComponent,
    platformRoute,
    PlatformService,
    shopComponent,
    shopRoute,
    ShopService,
    DefaultApproverService,
    BrandAddComponent,
    GoodAddComponent,
    GoodDetailComponent,
    GoodSkuAddComponent,
    GoodSkuDetailComponent,
    HelpRolesAddComponent,
    HelpRolesDetailComponent,
    PlatformAddComponent,
    PlatformDetailComponent,
    ShopAddComponent,
} from "./";
const BaseData_COMPONENTS = [
    BaseDataComponent,
    brandComponent,
    goodSkuComponent,
    goodComponent,
    helpRolesComponent,
    platformComponent,
    shopComponent,
];
const routes: Routes = [
    {
        path: '',
        component: BaseDataComponent,
        children: [
            ...brandRoute,
            ...goodRoute,
            ...goodSkuRoute,
            ...helpRolesRoute,
            ...platformRoute,
            ...shopRoute,
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
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...BaseData_COMPONENTS],
    entryComponents:[
        BrandAddComponent,
        GoodAddComponent,
        GoodDetailComponent,
        GoodSkuAddComponent,
        GoodSkuDetailComponent,
        HelpRolesAddComponent,
        HelpRolesDetailComponent,
        PlatformAddComponent,
        PlatformDetailComponent,
        ShopAddComponent,
    ],
    providers:[
      BrandService,
      DefaultApproverService,
      GoodSkuService,
      GoodService,
      HelpRolesService,
      PlatformService,
      ShopService,
  ]
})
export class BaseDataModule { }
