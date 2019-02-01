import {Routes} from '@angular/router';
import {ContractReviewComponent} from './contract-review.component';

export const contractReviewRoute: Routes = [
    {
        path: 'contract-review',
        component: ContractReviewComponent,
        data: {
            pageTitle: '合同审核'
        }
    },
];

export const contractReviewComponent = [
    ContractReviewComponent,
];
