 import { Routes } from '@angular/router';
 import { ActionProcessComponent } from './action-process.component';

 // 导出字典路由
 export const actionProcessRoute: Routes = [
     {
         path: 'action-process',
         component: ActionProcessComponent,
         data: {
             pageTitle: '流程管理'
         }
     }
 ];


 export const actionProcessComponent = [
     ActionProcessComponent,
 ];
