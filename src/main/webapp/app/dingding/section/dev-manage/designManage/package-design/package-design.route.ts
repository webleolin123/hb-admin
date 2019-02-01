import {Routes} from '@angular/router';
import {PackageDesignComponent} from './package-design.component';

export const packageDesignRoute: Routes = [
    {
        path: 'package-design',
        component: PackageDesignComponent,
        data: {
            pageTitle: '包装设计申请'
        }
    },
];

export const packageDesignComponent = [
    PackageDesignComponent,
];
