import { Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ShopAddComponent } from './shop-add.component';

// 导出字典路由
export const shopRoute: Routes = [
    {
        path: 'shop',
        component: ShopComponent,
        data: {
            pageTitle: '店铺管理'
        }
    }
];


export const shopComponent = [
    ShopComponent,
    ShopAddComponent,
];
