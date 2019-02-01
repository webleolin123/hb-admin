import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {HomeSomeListComponent, } from './home-someList.component';
import {HomeSomeListDetailComponent, } from './home-someList-detail.component';
export const homeRoute: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: {
            pageTitle: '首页'
        },
    },
    {
        path: 'home-someList',
        component: HomeSomeListComponent,
        data: {
            pageTitle: '记录查看'
        },
    },
];

export const homeComponent = [
    HomeComponent,
    HomeSomeListComponent,
    HomeSomeListDetailComponent,
];
