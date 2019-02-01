import { Routes } from '@angular/router';
import { GoodComponent } from './good.component';
import { GoodAddComponent } from './good-add.component';
import {GoodDetailComponent} from "./good-detail.component";


// 导出字典路由
export const goodRoute: Routes = [
    {
        path: 'good',
        component: GoodComponent,
        data: {
            pageTitle: '平台管理'
        }
    }
];


export const goodComponent = [
    GoodComponent,
    GoodAddComponent,
    GoodDetailComponent,
];
