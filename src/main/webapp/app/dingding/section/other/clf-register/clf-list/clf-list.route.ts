import { Routes } from '@angular/router';
import { DemoClfComponent } from './clf-list.component';

// 添加新数据组件
import {ClfEditComponent} from "../clf-edit/clf-edit.component";
import {ClfBatchEditComponent} from "../clf-batchEdit/clf-batchEdit.component";
import {ClfDetailComponent} from "../clf-detail/clf-detail.component";
import {ClfExportComponent} from "../clf-export/clf-export.component";


// 导出字典路由
export const clfRoute: Routes = [
    {
        path: 'clf-register',
        component: DemoClfComponent,
        data: {
            pageTitle: '售后登记管理'
        }
    }
];
export const clfComponents = [
    DemoClfComponent,
    ClfEditComponent,
    ClfBatchEditComponent,
    ClfDetailComponent,
    ClfExportComponent,
];
