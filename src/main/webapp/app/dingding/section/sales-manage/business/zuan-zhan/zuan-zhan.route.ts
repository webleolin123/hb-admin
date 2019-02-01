import { Routes } from '@angular/router';
import { ZuanZhanComponent } from './zuan-zhan.component';
import { ZuanZhanAddComponent } from './zuan-zhan-add.component';
import { ZuanZhanDetailComponent } from './zuan-zhan-detail.component';
export const zuanZhanRoute: Routes = [
    {
        path: 'zuan-zhan',
        component: ZuanZhanComponent,
        data: {
            pageTitle: '钻展管理'
        }
    }
];


export const zuanZhanComponent = [
    ZuanZhanComponent,
    ZuanZhanAddComponent,
    ZuanZhanDetailComponent
];
