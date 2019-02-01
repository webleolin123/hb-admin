/**
 * Created by Administrator on 2018/7/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './system/user/user.component';
import {SystemsComponent} from './systems.component';

const systemsRoutes: Routes = [
    {
        path: '',
        component: SystemsComponent,
        children: [{
            path: 'user',
            component: UserComponent,
        }, {
            path: 'system',
            loadChildren: './system/system.module#SysModule',
        }, {
            path: 'messages',
            loadChildren: './messages/messages.module#MessagesModule',
        },
        {
            path: '',
            redirectTo: 'user',
            pathMatch: 'full',
        },
        ],
    }];

@NgModule({
    imports: [
        RouterModule.forChild(systemsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SystemsRoutingModule {
}
