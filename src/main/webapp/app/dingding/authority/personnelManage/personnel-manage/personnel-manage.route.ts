import {Routes} from '@angular/router';
import {PersonnelManageComponent} from './personnel-manage.component';
import {PersonnelManageDetailComponent} from './personnel-manage-detail.component';
export const personnelManageRoute: Routes = [
    {
        path: 'personnel-manage',
        component: PersonnelManageComponent,
        data: {
            pageTitle: '人员管理'
        }
    },
];
export const personnelManageComponent = [
    PersonnelManageComponent,
    PersonnelManageDetailComponent,
];
