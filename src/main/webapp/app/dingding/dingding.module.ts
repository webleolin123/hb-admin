import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../@theme/theme.module';
import {HbadminSharedModule} from '../shared';
import {HbadminCoreModule} from '../core';
import {HbadminCommondModule} from '../common';
import {HbadminSharedCommonModule} from '../shared';
import {FileUploadModule} from 'ng2-file-upload';
import {DingDingRoutingModule} from './dingding-routing.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {DingDingComponent} from './dingding.component';
import {SectionModule} from './section/section.module';
import {AuthorityContainerModule} from './authority/authority-container.module';
import {MessagesContainerModule} from './messages/messages-container.module';
import {HomeModule} from './home/home.module';
const DingDing_COMPONENTS = [
DingDingComponent,
];
@NgModule({
    imports: [
        DingDingRoutingModule,
        CommonModule,
        FileUploadModule,
        HbadminSharedModule,
        HbadminCoreModule,
        HbadminSharedCommonModule,
        HbadminCommondModule,
        ThemeModule,
        DashboardModule,
        SectionModule,
        AuthorityContainerModule,
        MessagesContainerModule,
        HomeModule,

    ],
    declarations: [
        ...DingDing_COMPONENTS,
    ],
    entryComponents: [],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DingDingModule {
}
