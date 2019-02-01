import { Routes } from '@angular/router';
import { DepartmentComponent } from './department.component';
// 导出字典路由
export const departmentRoute: Routes = [
    {
        path: 'department',
        component: DepartmentComponent,
        data: {
            pageTitle: '部门管理'
        }
    }
];
export const departmentComponent = [
    DepartmentComponent,
];
