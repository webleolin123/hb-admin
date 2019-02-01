import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {HbadminSharedModule} from '../../shared';
import {HbadminCoreModule} from '../../core';
import {FileUploadModule} from 'ng2-file-upload';
import {ToasterService, ToasterModule} from 'angular2-toaster';

import {
    MessagesComponent,
    aliSmsComponent, aliSmsRoute, AliSmsService,
    baiduSmsComponent, baiduSmsRoute, BaiduSmsService,
    messageComponent, messageRoute, MessageService,
} from './'
import {MessageDetailComponent} from "./message/message-detail.component";
import {BaiduSmsAddComponent} from "./baidu-sms/baidu-sms-add.component";
import {AliSmsDetailComponent} from "./ali-sms/ali-sms-detail.component";
const Message_COMPONENTS = [
    MessagesComponent,
    aliSmsComponent,
    baiduSmsComponent,
    messageComponent,

];
const routes: Routes = [
    {
        path: '',
        component: MessagesComponent,
        children: [
            ...aliSmsRoute,
            ...baiduSmsRoute,
            ...messageRoute,
        ],
    },
];
@NgModule({
    imports: [
        ThemeModule,
        CommonModule,
        HbadminSharedModule,
        HbadminCoreModule,
        FileUploadModule,

        ToasterModule,
        RouterModule.forChild(routes),
    ],
    entryComponents: [
        // 弹出框组件声明才能使用
        MessageDetailComponent,
        BaiduSmsAddComponent,
        AliSmsDetailComponent,

    ],
    declarations: [
        ...Message_COMPONENTS
    ],
    providers: [
        AliSmsService,
        BaiduSmsService,
        MessageService,
        ToasterService,
    ]
})
export class MessagesModule {
}
