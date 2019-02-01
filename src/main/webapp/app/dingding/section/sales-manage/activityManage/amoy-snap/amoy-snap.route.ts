import {Routes} from '@angular/router';
import {AmoySnapComponent} from './amoy-snap.component';

export const amoySnapRoute: Routes = [
    {
        path: 'amoy-snap',
        component: AmoySnapComponent,
        data: {
            pageTitle: '淘抢购（商品团、品牌团、主题团）'
        }
    },
];

export const amoySnapComponent = [
    AmoySnapComponent,
];
