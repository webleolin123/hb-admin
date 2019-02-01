import { Routes } from '@angular/router';
import { AliSmsComponent } from './ali-sms.component';
import { AliSmsDetailComponent } from './ali-sms-detail.component';
export const aliSmsRoute: Routes = [
    {
        path: 'ali-sms',
        component: AliSmsComponent,
        data: {
            pageTitle: '短信推送'
        }
    },
];
export const aliSmsComponent = [
    AliSmsComponent,
    AliSmsDetailComponent
];
