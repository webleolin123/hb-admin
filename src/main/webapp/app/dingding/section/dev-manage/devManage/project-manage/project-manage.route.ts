import {Routes} from '@angular/router';
import {ProjectManageComponent} from './project-manage.component';

export const projectManageRoute: Routes = [
    {
        path: 'project-manage',
        component: ProjectManageComponent,
        data: {
            pageTitle: '项目管理'
        }
    },
];
export const projectManageComponent = [
    ProjectManageComponent,
];
