import {Routes} from '@angular/router';
import {PersonalComponent} from './personal.component';
export const personalPswRoute: Routes = [
    {
        path: 'personal',
        component: PersonalComponent,
        data: {
            pageTitle: '个人信息'
        }
    },
];
export const personalComponents = [
    PersonalComponent,
];
