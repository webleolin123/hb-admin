import {Routes} from '@angular/router';
import {GiftComponent} from './gift.component';
import {GiftAddComponent} from './gift-add.component';
import {GiftDetailComponent} from './gift-detail.component';

export const giftRoute: Routes = [
    {
        path: 'gift',
        component: GiftComponent,
        data: {
            pageTitle: '赠品申请'
        }
    },
];
export const giftComponent = [
    GiftComponent,
    GiftAddComponent,
    GiftDetailComponent,
];
