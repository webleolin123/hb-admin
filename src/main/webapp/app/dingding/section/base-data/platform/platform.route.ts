import { Routes } from '@angular/router';
import { PlatformComponent } from './platform.component';
import { PlatformAddComponent } from './platform-add.component';
import {PlatformDetailComponent} from "./platform-detail.component";

// 导出字典路由
export const platformRoute: Routes = [
    {
        path: 'platform',
        component: PlatformComponent,
        data: {
            pageTitle: '平台管理'
        }
    }
];


export const platformComponent = [
    PlatformComponent,
    PlatformAddComponent,
    PlatformDetailComponent,

];
