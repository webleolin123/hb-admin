import {Routes} from '@angular/router';
import {PolyCostComponent} from './poly-cost.component';

export const polyCostRoute: Routes = [
    {
        path: 'poly-cost',
        component: PolyCostComponent,
        data: {
            pageTitle: '聚划算（商品团、品牌团、主题团）'
        }
    },
];
export const polyCostComponent = [
    PolyCostComponent,
];
