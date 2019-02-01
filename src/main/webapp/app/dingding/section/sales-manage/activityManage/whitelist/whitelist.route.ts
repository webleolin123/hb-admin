import {Routes} from '@angular/router';
import {WhitelistComponent} from './whitelist.component';

export const whitelistRoute: Routes = [
    {
        path: 'whitelist',
        component: WhitelistComponent,
        data: {
            pageTitle: '白名单申请（商品团、品牌团、主题团）'
        }
    },
];
export const whitelistComponent = [
    WhitelistComponent,
];
