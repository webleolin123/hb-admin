import {Routes} from '@angular/router';
import {SamplingComponent} from './sampling.component';

export const samplingRoute: Routes = [
    {
        path: 'sampling',
        component: SamplingComponent,
        data: {
            pageTitle: '取样申请'
        }
    },
];

export const samplingComponent = [
    SamplingComponent,
];
