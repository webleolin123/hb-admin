import { Routes } from '@angular/router';
import { TabooedComponent } from './tabooed.component';
import { TabooedAddComponent } from './tabooed-add.component';
export const tabooedRoute: Routes = [
    {
        path: 'tabooed',
        component: TabooedComponent,
        data: {
            pageTitle: '敏感词管理'
        }
    }
]

export const tabooedComponent = [
    TabooedComponent,
    TabooedAddComponent
];
