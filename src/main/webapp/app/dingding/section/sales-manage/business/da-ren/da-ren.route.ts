import { Routes } from '@angular/router';
import { DaRenComponent } from './da-ren.component';
import { DaRenAddComponent } from './da-ren-add.component';
import { DaRenDetailComponent } from './da-ren-detail.component';
export const daRenRoute: Routes = [
    {
        path: 'da-ren',
        component: DaRenComponent,
        data: {
            pageTitle: '达人管理'
        }
    }
];


export const daRenComponent = [
    DaRenComponent,
    DaRenAddComponent,
    DaRenDetailComponent
];
