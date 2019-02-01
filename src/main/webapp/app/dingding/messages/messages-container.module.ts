/**
 * Created by yl on 2018/3/23.
 */
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {NbThemeService} from "@nebular/theme";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {HbadminSharedModule} from '../../shared/index';
import {HbadminCoreModule} from '../../core/index';
import {HbadminSharedCommonModule} from '../../shared/index';

import {FileUploadModule} from 'ng2-file-upload';
import {ToasterService, ToasterModule} from 'angular2-toaster';

import {
    MessagesContainerComponent,
    notificationComponent,
    notificationRoute,
    NotificationService,

} from './index';
import {NotificationPublishComponent} from "./notification/notification-publish.component";
import {NotificationDetailComponent} from "./notification/notification-detail.component";
const Messages_COMPONENTS = [
    MessagesContainerComponent,
    notificationComponent,
];
const routes: Routes = [
    {
        path: '',
        component: MessagesContainerComponent,
        children:[
            ...notificationRoute,
        ],
    }
];
@NgModule({
    imports: [
        ThemeModule,
        CommonModule,
        HbadminSharedModule,
        HbadminCoreModule,
        HbadminSharedCommonModule,
        FileUploadModule,
        ToasterModule,
        RouterModule.forChild(routes),
    ],
    declarations: [...Messages_COMPONENTS,],
    entryComponents: [
        NotificationPublishComponent,
        NotificationDetailComponent,
    ],
    providers: [
        ToasterService,
        NbThemeService,
        NgbModal,
        NotificationService,
    ]
})
export class MessagesContainerModule {
}
