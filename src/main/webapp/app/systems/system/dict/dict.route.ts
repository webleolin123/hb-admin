import { Routes } from '@angular/router';
import { DictComponent } from './dict.component';
import { DictAddComponent } from './dict-add.component';
import { DictDetailComponent } from './dict-detail.component';
// 导出字典路由
export const dictRoute: Routes = [
    {
        path: 'dict',
        component: DictComponent,
        data: {
            pageTitle: '数据字典'
        }
    }
];

export const dictComponents = [
    DictComponent,
    DictAddComponent,
    DictDetailComponent
];
