import {Routes} from '@angular/router';
import {SubmitReportComponent} from './submit-report.component';

export const submitReportRoute: Routes = [
    {
        path: 'submit-report',
        component: SubmitReportComponent,
        data: {
            pageTitle: '提交报告'
        }
    },
];

export const submitReportComponent = [
    SubmitReportComponent,
];
