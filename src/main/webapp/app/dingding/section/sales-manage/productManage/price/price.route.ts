import {Routes} from '@angular/router';
import {PriceComponent} from './price.component';
import {PriceAddComponent} from './price-add.component';
import {PriceDetailComponent} from './price-detail.component';

export const priceRoute: Routes = [
    {
        path: 'price',
        component: PriceComponent,
        data: {
            pageTitle: '价格申请'
        }
    },
];

export const priceComponent = [
    PriceComponent,
    PriceAddComponent,
    PriceDetailComponent,
];
