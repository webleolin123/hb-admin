import {Routes} from '@angular/router';
import {NegotiationReportComponent} from './negotiation-report.component';

export const negotiationReportRoute: Routes = [
    {
        path: 'negotiation-report',
        component: NegotiationReportComponent,
        data: {
            pageTitle: '洽谈汇报'
        }
    },
];
export const negotiationReportComponent = [
    NegotiationReportComponent,
];
