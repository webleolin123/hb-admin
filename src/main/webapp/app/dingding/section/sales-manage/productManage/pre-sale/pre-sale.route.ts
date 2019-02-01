import {Routes} from '@angular/router';
import {PreSaleComponent} from './pre-sale.component';
import { PreSaleAddComponent } from './pre-sale-add.component';
import { PreSaleDetailComponent } from './pre-sale-detail.component';

export const preSaleRoute: Routes = [
    {
        path: 'pre-sale',
        component: PreSaleComponent,
        data: {
            pageTitle: '预售申请'
        }
    },
];
export const preSaleComponent = [
    PreSaleComponent,
    PreSaleAddComponent,
    PreSaleDetailComponent,
];
