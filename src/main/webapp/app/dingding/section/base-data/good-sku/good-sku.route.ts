
import { Routes } from '@angular/router';
import { GoodSkuComponent } from './good-sku.component';
import { GoodSkuAddComponent } from './good-sku-add.component';
import { GoodSkuDetailComponent } from './good-sku-detail.component';

// 导出字典路由
export const goodSkuRoute: Routes = [
    {
        path: 'sku',
        component: GoodSkuComponent,
        data: {
            pageTitle: '商品SKU管理'
        }
    }
];


export const goodSkuComponent = [
    GoodSkuComponent,
    GoodSkuAddComponent,
    GoodSkuDetailComponent,
];
