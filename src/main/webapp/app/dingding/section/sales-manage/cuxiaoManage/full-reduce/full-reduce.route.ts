import {Routes} from '@angular/router';
import {FullReduceComponent} from './full-reduce.component';
import {FullReduceAddComponent} from './full-reduce-add.component';
import {FullReduceDetailComponent} from './full-reduce-detail.component';

export const fullReduceRoute: Routes = [
    {
        path: 'full-reduce',
        component: FullReduceComponent,
        data: {
            pageTitle: '满减申请'
        }
    },
];
export const fullReduceComponent = [
    FullReduceComponent,
    FullReduceAddComponent,
    FullReduceDetailComponent,
];
