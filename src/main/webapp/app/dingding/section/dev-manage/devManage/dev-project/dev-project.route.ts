import {Routes} from '@angular/router';
import {DevProjectComponent} from './dev-project.component';

export const devProjectRoute: Routes = [
    {
        path: 'dev-project',
        component: DevProjectComponent,
        data: {
            pageTitle: '开发立项'
        }
    },
];

export const devProjectComponent = [
    DevProjectComponent,
];
