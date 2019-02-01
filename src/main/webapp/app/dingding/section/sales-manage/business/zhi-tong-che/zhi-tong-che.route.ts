import { Routes } from '@angular/router';
import { ZhiTongCheComponent } from './zhi-tong-che.component';
import { ZhiTongCheAddComponent } from './zhi-tong-che-add.component';
import { ZhiTongCheDetailComponent } from './zhi-tong-che-detail.component';
export const zhiTongCheRoute: Routes = [
    {
        path: 'zhi-tong-che',
        component: ZhiTongCheComponent,
        data: {
            pageTitle: '直通车管理'
        }
    }
];
export const zhiTongCheComponent = [
    ZhiTongCheComponent,
    ZhiTongCheAddComponent,
    ZhiTongCheDetailComponent,
];
