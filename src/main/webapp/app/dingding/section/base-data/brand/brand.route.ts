import { Routes } from '@angular/router';
import { BrandComponent } from './brand.component';
import {BrandAddComponent, } from './brand-add.component';
export const brandRoute: Routes = [
    {
        path: 'brand',
        component: BrandComponent,
        data: {
            pageTitle: '品牌管理'
        }
    }
];
export const brandComponent = [
    BrandComponent,
    BrandAddComponent,
];
