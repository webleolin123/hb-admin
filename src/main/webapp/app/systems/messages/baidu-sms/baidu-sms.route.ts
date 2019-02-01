import { Routes } from '@angular/router';
import { BaiduSmsComponent } from './baidu-sms.component';
import { BaiduSmsAddComponent } from './baidu-sms-add.component';
export const baiduSmsRoute: Routes = [
    {
        path: 'baidu-sms',
        component: BaiduSmsComponent,
        data: {
            pageTitle: '百度推送管理'
        }
    }
];

export const baiduSmsComponent = [
    BaiduSmsComponent,
    BaiduSmsAddComponent
];
