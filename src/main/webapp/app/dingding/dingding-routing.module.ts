import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DingDingComponent} from './dingding.component';
import {HomeComponent} from './home/home.component';
import {HomeSomeListComponent} from "./home/home-someList.component";
const DingDingRoutes: Routes = [
    {
        path: '',
        component: DingDingComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'home-someList',
                component: HomeSomeListComponent,
            },
            // {
            //     path: '',
            //     component: DashboardComponent,
            // },
            // {
            //     path: 'dashboard',
            //     component: DashboardComponent,
            // },
            {
                path: 'section',
                loadChildren: './section/section.module#SectionModule',
            },
            {
                path: 'authority',
                loadChildren: './authority/authority-container.module#AuthorityContainerModule',
            },
            {
                path: 'messages',
                loadChildren: './messages/messages-container.module#MessagesContainerModule',
            },
            {
                path: '',
                redirectTo: 'home-someList',
                pathMatch: 'full',
            },
            ],
    }];

@NgModule({
    imports: [
        RouterModule.forChild(DingDingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DingDingRoutingModule {
}
