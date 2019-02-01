import { Routes } from '@angular/router';
import { HelpRolesComponent } from './help-roles.component';
import { HelpRolesAddComponent} from './help-roles-add.component';
import { HelpRolesDetailComponent} from './help-roles-detail.component';

export const helpRolesRoute: Routes = [
    {
        path: 'help-roles',
        component: HelpRolesComponent,
        data: {
            pageTitle: '规则管理'
        }
    }
];


export const helpRolesComponent = [
    HelpRolesComponent,
    HelpRolesAddComponent,
    HelpRolesDetailComponent
];
