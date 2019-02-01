import {Routes} from '@angular/router';
import {StockTransferComponent} from './stock-transfer.component';
import {StockTransferAddComponent} from './stock-transfer-add.component';
import {StockTransferDetailComponent} from './stock-transfer-detail.component';

export const stockTransferRoute: Routes = [
    {
        path: 'stock-transfer',
        component: StockTransferComponent,
        data: {
            pageTitle: '库存调拨申请'
        }
    },
];
export const stockTransferComponent = [
    StockTransferComponent,
    StockTransferAddComponent,
    StockTransferDetailComponent,
];
