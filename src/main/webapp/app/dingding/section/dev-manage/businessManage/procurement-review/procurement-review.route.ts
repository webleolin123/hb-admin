import {Routes} from '@angular/router';
import {ProcurementReviewComponent} from './procurement-review.component';

export const procurementReviewRoute: Routes = [
    {
        path: 'procurement-review',
        component: ProcurementReviewComponent,
        data: {
            pageTitle: '采购审核'
        }
    },
];

export const procurementReviewComponent = [
    ProcurementReviewComponent,
];
