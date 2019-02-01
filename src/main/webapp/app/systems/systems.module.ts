/**
 * Created by Administrator on 2018/7/9.
 */
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../@theme/theme.module';
import {HbadminSharedModule} from '../shared';
import {HbadminCoreModule} from '../core';
import {FileUploadModule} from 'ng2-file-upload';

import {SystemsComponent} from './systems.component';
import {SystemsRoutingModule} from './systems-routing.module';
// import {SysModule}  from  './system/system.module';
// import {MessagesModule} from  './messages/messages.module';
const SYSTEMS_COMPONENTS = [
    SystemsComponent,
];
@NgModule({
    imports: [
        SystemsRoutingModule,
        CommonModule,
        FileUploadModule,
        HbadminSharedModule,
        HbadminCoreModule,
        ThemeModule,

        // SysModule,
        // MessagesModule,
    ],
    declarations: [
        ...SYSTEMS_COMPONENTS,
    ],
    entryComponents: [],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SystemsModule {
}
