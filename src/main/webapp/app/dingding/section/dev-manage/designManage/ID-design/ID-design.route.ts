import {Routes} from '@angular/router';
import {IDDesignComponent} from './ID-design.component';

export const IDDesignRoute: Routes = [
    {
        path: 'ID-design',
        component: IDDesignComponent,
        data: {
            pageTitle: 'ID设计申请'
        }
    },
];
export const iDDesignComponent = [
    IDDesignComponent,
];
