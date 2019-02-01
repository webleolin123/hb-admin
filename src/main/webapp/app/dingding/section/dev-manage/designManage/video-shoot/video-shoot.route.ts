import {Routes} from '@angular/router';
import {VideoShootComponent} from './video-shoot.component';

export const videoShootRoute: Routes = [
    {
        path: 'video-shoot',
        component: VideoShootComponent,
        data: {
            pageTitle: '视频拍摄申请'
        }
    },
];
export const videoShootComponent = [
    VideoShootComponent,
];
