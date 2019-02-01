import './vendor.ts';

import {APP_BASE_HREF} from '@angular/common';
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { HttpClientModule } from '@angular/common/http';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CoreModule} from './@core/core.module';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { UserRouteAccessService } from './core';
import { HbadminSharedModule } from './shared';
import { HbadminCoreModule } from './core';
import { HbadminAppRoutingModule} from './app-routing.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import {AppComponent} from './app.component';
// import {PagesModule} from './pages/pages.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
// import {
//     ProfileService,
// } from './layouts';
@NgModule({
    imports: [
        BrowserModule,
        HbadminAppRoutingModule,
        HbadminCoreModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        HbadminSharedModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        BrowserAnimationsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        CoreModule.forRoot(),
        // PagesModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        // ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [AppComponent]
})
export class HbadminAppModule {}
