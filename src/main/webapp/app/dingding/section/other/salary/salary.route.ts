import { Routes } from '@angular/router';
import { SalaryComponent } from './salary.component';
import { SalaryDetailComponent } from './salary-detail.component';
// 导出
export const salaryRoute: Routes = [
    {
        path: 'salary',
        component: SalaryComponent,
        data: {
            pageTitle: '工资条'
        },

    },
    {
        path: 'salary/salary-detail',
        component: SalaryDetailComponent,
        data: {
            pageTitle: '记录查看'
        },
    }
];

export const salaryComponent = [
    SalaryComponent,
    SalaryDetailComponent,
];
