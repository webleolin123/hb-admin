import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemeModule} from '../../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {HbadminSharedModule} from '../../shared';
import {HbadminCoreModule} from '../../core';
import {HbadminSharedCommonModule} from '../../shared';
import {FileUploadModule} from 'ng2-file-upload';
import {ToasterService, ToasterModule} from 'angular2-toaster';

import {UserService} from "../../core/user/user.service"
import {
    SysComponent,
    browserSupportComponent,
    browserSupportRoute,
    changePswRoute,
    changePswComponents,
    dictComponents,
    dictRoute,
    DictService,
    personalComponents,
    tabooedComponent,
    tabooedRoute,
    TabooedService,
    userComponents,
    userRoute,
    personalPswRoute,
    menuSettingsRoute,
    menuSettingsComponent,
    messagesSettingsRoute,
    messagesSettingsComponent,

} from './';
import {DictComponent} from "./dict/dict.component";
import {DictAddComponent} from "./dict/dict-add.component";
import {DictDetailComponent} from "./dict/dict-detail.component";
import {TabooedComponent} from "./tabooed/tabooed.component";
import {TabooedAddComponent} from "./tabooed/tabooed-add.component";
import {UserDialogComponent} from "./user/user-dialog.component";
const System_COMPONENTS = [
    SysComponent,
    browserSupportComponent,
    changePswComponents,
    dictComponents,
    personalComponents,
    tabooedComponent,
    userComponents,
    messagesSettingsComponent,
    menuSettingsComponent,

];
const routes: Routes = [
    {
        path: '',
        component: SysComponent,
        children: [
            ...dictRoute,
            ...userRoute,
            ...tabooedRoute,
            ...changePswRoute,
            ...personalPswRoute,
            ...browserSupportRoute,
            ...messagesSettingsRoute,
            ...menuSettingsRoute,
        ],
    }
];
    @NgModule({
    imports: [
        ThemeModule,
        CommonModule,
        HbadminCoreModule,
        HbadminSharedModule,
        HbadminSharedCommonModule,
        FileUploadModule,
        ToasterModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        ...System_COMPONENTS,
    ],
    entryComponents: [
        DictComponent,
        DictAddComponent,
        DictDetailComponent,
        TabooedComponent,
        TabooedAddComponent,
        UserDialogComponent,

    ],
    providers: [
        DictService,
        UserService,
        TabooedService,
        ToasterService,
    ]
})
export class SysModule {
}
