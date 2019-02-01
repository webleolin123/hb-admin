import { Routes } from '@angular/router';
import { MessageComponent } from './message.component';
import { MessageAddComponent } from './message-add.component';
import { MessageDetailComponent } from './message-detail.component';
export const messageRoute: Routes = [
    {
        path: 'message',
        component: MessageComponent,
        data: {
            pageTitle: '钻展管理'
        }
    }
];


export const messageComponent = [
    MessageComponent,
    MessageAddComponent,
    MessageDetailComponent
];
