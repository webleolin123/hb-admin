import {Routes} from '@angular/router';
import {LoadUploadComponent} from './load-upload.component';
import {LoadUploadAddComponent} from './load-upload-add.component';
import {LoadUploadDetailComponent} from './load-upload-detail.component';
export const loadUploadRoute: Routes = [
    {
        path: 'load-upload',
        component: LoadUploadComponent,
        data: {
            pageTitle: '上下架申请'
        }
    },
];
export const loadUploadComponent = [
    LoadUploadComponent,
    LoadUploadAddComponent,
    LoadUploadDetailComponent,
];
