import {Routes} from '@angular/router';
import {EventSaveComponent} from './event-save.component';

export const eventSaveRoute: Routes = [
    {
        path: 'event-save',
        component: EventSaveComponent,
        data: {
            pageTitle: '活动存盘'
        }
    },
];
export const eventSaveComponent = [
    EventSaveComponent,
];
