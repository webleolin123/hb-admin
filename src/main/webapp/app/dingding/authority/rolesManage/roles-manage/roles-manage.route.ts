import {Routes} from '@angular/router';
import {RolesManageComponent} from './roles-manage.component';
import {RolesManageAddRoleComponent} from './roles-manage-add-role.component';

export const rolesManageRoute: Routes = [
    {
        path: 'roles-manage',
        component: RolesManageComponent,
        data: {
            pageTitle: '角色管理'
        }
    },
];

export const rolesManageComponent = [
    RolesManageComponent,
    RolesManageAddRoleComponent,
];

