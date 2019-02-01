import {Routes} from '@angular/router';
import {MessagesSettingsComponent} from './messages-settings.component';

export const messagesSettingsRoute: Routes = [
    {
        path: 'messages-settings',
        component: MessagesSettingsComponent,
        data: {
            pageTitle: '消息设置'
        }
    },
];

export const messagesSettingsComponent = [
    MessagesSettingsComponent,
];

