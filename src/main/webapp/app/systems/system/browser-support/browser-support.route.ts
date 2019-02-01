import {Routes} from '@angular/router';
import {BrowserSupportComponent} from './browser-support.component';
export const browserSupportRoute: Routes = [
    {
        path: 'browser-support',
        component: BrowserSupportComponent,
        data: {
            pageTitle: '浏览器支持'
        }

    }
];
export const browserSupportComponent = [
    BrowserSupportComponent
];
