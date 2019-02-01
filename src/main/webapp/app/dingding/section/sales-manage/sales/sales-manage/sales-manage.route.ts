import {Routes} from '@angular/router';
import {SalesManageComponent} from './sales-manage.component';
import {SalesApplyListComponent} from './sales-apply-list/sales-apply-list.component';
import {SalesApplyDetailComponent} from './sales-apply-detail/sales-apply-detail.component';

export const salesManageRoute: Routes = [
    {
        path: 'sales-manage',
        component: SalesManageComponent,
        data: {
            pageTitle: '销售管理'
        }
    },
    {
        path: 'sales-apply-list',
        component: SalesApplyListComponent,
        data: {
            pageTitle: '模块申请'
        }
    },
];
export const salesManageComponent = [
    SalesManageComponent,
    SalesApplyListComponent,
    SalesApplyDetailComponent,
];
