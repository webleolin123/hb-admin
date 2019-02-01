import {Routes} from '@angular/router';
import {SalesProjectComponent} from './sales-project.component';

export const salesProjectRoute: Routes = [
    {
        path: 'sales-project',
        component: SalesProjectComponent,
        data: {
            pageTitle: '销售立项'
        }
    },
];

export const salesProjectComponent = [
    SalesProjectComponent,
];
