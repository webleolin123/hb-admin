import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from '../../../@theme/theme.module';
import {FileUploadModule} from 'ng2-file-upload';
import {ToasterService, ToasterModule} from 'angular2-toaster';
import {HbadminCoreModule} from '../../../core';
import {HbadminCommondModule} from '../../../common';
import {Routes, RouterModule} from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import {CommonMethodsService} from "../../../common/methods/commonMethods.service";
import {
    OtherComponent,
    salaryRoute,
    salaryComponent,
    attendanceRoute,
    attendanceComponent,
    appraiseRoute,
    appraiseComponent,
    AppraiseService,
    clfComponents,
    clfRoute,
    meetingsComponent, meetingsRoute,
} from "./";
import {ClfEditComponent} from "./clf-register/clf-edit/clf-edit.component";
import {ClfDetailComponent} from "./clf-register/clf-detail/clf-detail.component";
import {ClfBatchEditComponent} from "./clf-register/clf-batchEdit/clf-batchEdit.component";
import {ClfExportComponent} from "./clf-register/clf-export/clf-export.component";
import {AppraiseDetailComponent} from "./appraise/appraise-detail.component";
import {AppraiseEditComponent} from "./appraise/appraise-edit.component";
import {AppraiseFilterComponent} from "./appraise/appraise-filter.component";
import {AppraiseBatchModifyComponent} from "./appraise/appraise-batch-modify.component";
import {AppraiseUploadComponent} from "./appraise/appraise-upload.component";
const OTHERCOMPONENTS = [
    OtherComponent,
    salaryComponent,
    attendanceComponent,
    appraiseComponent,
    clfComponents,
    meetingsComponent,
];
const routes: Routes = [
    {
        path: '',
        component: OtherComponent,
        children: [
            ...salaryRoute,
            ...attendanceRoute,
            ...appraiseRoute,
            ...clfRoute,
            ...meetingsRoute,
        ],
    },
];
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ToasterModule,
    FileUploadModule,
    HbadminCoreModule,
    HbadminCommondModule,
    NgxEchartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...OTHERCOMPONENTS],
  entryComponents: [
        ClfEditComponent,
        ClfDetailComponent,
        ClfBatchEditComponent,
        ClfExportComponent,
        AppraiseDetailComponent,
        AppraiseEditComponent,
        AppraiseFilterComponent,
        AppraiseBatchModifyComponent,
        AppraiseUploadComponent,
    ],
  providers:[
      ToasterService,
      AppraiseService,
      CommonMethodsService,
  ],
    exports:[HbadminCommondModule],
})
export class OtherModule { }
