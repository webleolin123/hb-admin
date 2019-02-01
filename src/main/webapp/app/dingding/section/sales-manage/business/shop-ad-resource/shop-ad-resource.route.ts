import {Routes} from '@angular/router';
import {ShopAdResourceComponent} from './shop-ad-resource.component';

export const shopAdResourceRoute: Routes = [
    {
        path: 'shop-ad-resource',
        component: ShopAdResourceComponent,
        data: {
            pageTitle: '店铺广告位资源申请'
        }
    },
];

export const shopAdResourceComponent = [
    ShopAdResourceComponent,
];
