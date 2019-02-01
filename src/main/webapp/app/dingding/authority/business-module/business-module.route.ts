import { Routes } from '@angular/router';
import { BusinessModuleComponent } from './business-module.component';
import { BusinessModuleAddComponent } from './business-module-add.component';
import { BusinessModuleDetailComponent } from './business-module-detail.component';
import { BusinessModuleChooseModuleComponent } from './business-module-choose-module.component';

// 导出字典路由
export const businessModuleRoute: Routes = [
    {
        path: 'business-module',
        component: BusinessModuleComponent,
        data: {
            pageTitle: '业务模块'
        }
    }
];


export const businessModuleComponent = [
    BusinessModuleComponent,
    BusinessModuleAddComponent,
    BusinessModuleDetailComponent,
    BusinessModuleChooseModuleComponent
];
