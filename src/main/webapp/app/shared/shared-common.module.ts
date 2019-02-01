import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import { WindowRef } from '../core/tracker/window.service';
import {
    HbadminSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent,
} from './';

@NgModule({
    imports: [
        HbadminSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent,
    ],
    providers: [
        WindowRef,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        HbadminSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent,
    ]
})
export class HbadminSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
