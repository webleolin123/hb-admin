import { Routes } from '@angular/router';
import { MessageComponent } from './message.component';
import { MessageDetailComponent } from './message-detail.component';
export const messageRoute: Routes = [
    {
        path: 'message',
        component: MessageComponent,
        data: {
            pageTitle: '消息通知管理'
        }
    }
]

export const messageComponent = [
    MessageComponent,
    MessageDetailComponent,
];
