import {Routes} from '@angular/router';
import {MeetingsComponent} from './meetings.component';

export const meetingsRoute: Routes = [
    {
        path: 'meetings',
        component: MeetingsComponent,
        data: {
            pageTitle: '会议'
        }
    },
];

export const meetingsComponent = [
    MeetingsComponent,
];
