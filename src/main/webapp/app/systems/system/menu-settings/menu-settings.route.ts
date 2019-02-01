import {Routes} from '@angular/router';
import {MenuSettingsComponent} from './menu-settings.component';

export const menuSettingsRoute: Routes = [
    {
        path: 'menu-settings',
        component: MenuSettingsComponent,
        data: {
            pageTitle: '菜单设置'
        }
    },
];

export const menuSettingsComponent = [
    MenuSettingsComponent,
];

