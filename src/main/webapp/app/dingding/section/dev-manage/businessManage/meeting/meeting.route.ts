import {Routes} from '@angular/router';
import {MeetingComponent} from './meeting.component';

export const meetingRoute: Routes = [
    {
        path: 'meeting',
        component: MeetingComponent,
        data: {
            pageTitle: '会议申请'
        }
    },
];

export const meetingComponent = [
    MeetingComponent,
];
