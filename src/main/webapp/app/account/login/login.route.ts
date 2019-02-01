import { Route } from '@angular/router';

import { LoginComponent } from './login.component';

export const loginRoute: Route = {
    path: 'login/:isLogout',
    component: LoginComponent,
    data: {
        authorities: [],
        pageTitle: '登录'
    }
};
