import {Routes} from '@angular/router';
import {PageDesignComponent} from './page-design.component';

export const pageDesignRoute: Routes = [
    {
        path: 'page-design',
        component: PageDesignComponent,
        data: {
            pageTitle: '页面设计申请'
        }
    },
];
export const pageDesignComponent = [
    PageDesignComponent,
];
