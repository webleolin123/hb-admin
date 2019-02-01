import {Routes} from '@angular/router';
import {WeChatPromotionComponent} from './WeChat-promotion.component';

export const weChatPromotionRoute: Routes = [
    {
        path: 'WeChat-promotion',
        component: WeChatPromotionComponent,
        data: {
            pageTitle: '微信推广'
        }
    },
];
export const weChatPromotionComponent = [
    WeChatPromotionComponent,
];
