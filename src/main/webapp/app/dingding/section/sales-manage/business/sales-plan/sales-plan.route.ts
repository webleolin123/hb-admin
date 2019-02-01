import {Routes} from '@angular/router';
import {SalesPlanComponent} from './sales-plan.component';

export const salesPlanRoute: Routes = [
    {
        path: 'sales-plan',
        component: SalesPlanComponent,
        data: {
            pageTitle: '销售方案'
        }
    },
];

export const salesPlanComponent = [
    SalesPlanComponent,
];
