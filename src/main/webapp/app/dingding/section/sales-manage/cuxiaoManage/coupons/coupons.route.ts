import {Routes} from '@angular/router';
import {CouponsComponent} from './coupons.component';
import {CouponsAddComponent} from './coupons-add.component';
import {CouponsDetailComponent} from './coupons-detail.component';

export const couponsRoute: Routes = [
    {
        path: 'coupons',
        component: CouponsComponent,
        data: {
            pageTitle: '优惠券申请'
        }
    },
];

export const couponsComponent = [
    CouponsComponent,
    CouponsAddComponent,
    CouponsDetailComponent,
];
