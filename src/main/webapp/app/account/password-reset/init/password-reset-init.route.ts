import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../../core';
import { PasswordResetInitComponent } from './password-reset-init.component';

export const passwordResetInitRoute: Route = {
    path: 'reset/request',
    component: PasswordResetInitComponent,
    data: {
        authorities: [],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
