import {Routes} from '@angular/router';
import {AuthorityComponent} from './authority.component';
import {AuthorityAddComponent,} from './authority-add.component';
import {AuthorityEditComponent,} from './authority-edit.component';
import {AuthorityDetailComponent,} from './authority-detail.component';

export const authorityRoute: Routes = [
    {
        path: 'authority-settings',
        component: AuthorityComponent,
        data: {
            pageTitle: '权限设置'
        }
    }
];

export const authorityComponent = [
    AuthorityComponent,
    AuthorityAddComponent,
    AuthorityEditComponent,
    AuthorityDetailComponent,
];
