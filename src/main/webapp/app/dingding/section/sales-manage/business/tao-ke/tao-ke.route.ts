import { Routes } from '@angular/router';
import { TaoKeComponent } from './tao-ke.component';
import { TaoKeAddComponent } from './tao-ke-add.component';
import { TaoKeDetailComponent } from './tao-ke-detail.component';
export const taoKeRoute: Routes = [
    {
        path: 'tao-ke',
        component: TaoKeComponent,
        data: {
            pageTitle: '淘宝客管理'
        }
    }
];


export const taoKeComponent = [
    TaoKeComponent,
    TaoKeAddComponent,
    TaoKeDetailComponent
];
