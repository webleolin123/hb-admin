import { Routes} from '@angular/router';
import {NotificationComponent} from './notification.component';
import {NotificationPublishComponent} from './notification-publish.component';
import {NotificationDetailComponent} from './notification-detail.component';

// 导出字典路由
export const notificationRoute: Routes = [
    {
        path: 'notification',
        component: NotificationComponent,
        data: {
            pageTitle: '消息中心'
        }
    }
];


export const notificationComponent = [
    NotificationComponent,
    NotificationPublishComponent,
    NotificationDetailComponent,
];
