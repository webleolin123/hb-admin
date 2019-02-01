import { Routes } from '@angular/router';

import {
    AccountComponent,
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    settingsRoute,
    loginRoute
} from './';

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    settingsRoute,
    loginRoute
];

export const accountState: Routes = [{
    path: '',
    component: AccountComponent,
    children: ACCOUNT_ROUTES
}];
