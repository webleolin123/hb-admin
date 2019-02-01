import {Routes} from '@angular/router';
import {OthersComponent} from './others.component';

export const othersRoute: Routes = [
    {
        path: 'others',
        component: OthersComponent,
        data: {
            pageTitle: '其他（天天特价、公域活动）'
        }
    },
];

export const othersComponent = [
    OthersComponent,
];
