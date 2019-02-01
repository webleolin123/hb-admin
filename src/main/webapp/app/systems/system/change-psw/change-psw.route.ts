import {Routes} from '@angular/router';
import {ChangePswComponent} from './change-psw.component';
export const changePswRoute: Routes = [
    {
        path: 'change-psw',
        component: ChangePswComponent,
        data: {
            pageTitle: '修改密码'
        }
    },
];

export const changePswComponents = [
    ChangePswComponent,
];
