import { Routes } from '@angular/router';
import { AppraiseComponent } from './appraise.component';
import { AppraiseDetailComponent } from './appraise-detail.component';
import { AppraiseEditComponent } from './appraise-edit.component';
import { AppraiseFilterComponent } from './appraise-filter.component';
import { AppraiseUploadComponent } from './appraise-upload.component';
import { AppraiseBatchModifyComponent } from './appraise-batch-modify.component';
// 导出字典路由
export const appraiseRoute: Routes = [
    {
        path: 'appraise',
        component: AppraiseComponent,
        data: {
            pageTitle: '负面评价采集'
        }
    }
];
export const appraiseComponent = [
    AppraiseComponent,
    AppraiseDetailComponent,
    AppraiseEditComponent,
    AppraiseFilterComponent,
    AppraiseBatchModifyComponent,
    AppraiseUploadComponent
];
