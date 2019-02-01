import {Routes} from '@angular/router';
import {CustomerPromotionComponent} from './customer-promotion.component';

export const customerPromotionRoute: Routes = [
    {
        path: 'customer-promotion',
        component: CustomerPromotionComponent,
        data: {
            pageTitle: '客服推广'
        }
    },
];
export const customerPromotionComponent = [
    CustomerPromotionComponent,
];
