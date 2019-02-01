import { Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserDialogComponent } from './user-dialog.component';

// 导出字典路由
export const userRoute: Routes = [
    {
        path: 'user',
        component: UserComponent,
        data: {
            pageTitle: '用户管理'
        }
    }
];

export const userComponents = [
    UserComponent,
    UserDialogComponent,
];
