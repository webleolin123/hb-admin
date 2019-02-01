import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    Principal,
    JhiTrackerService,
} from './';

@NgModule({
    imports: [
    ],
    declarations: [
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        UserService,
        NgbActiveModal,
    ],
    entryComponents: [
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HbadminCoreModule {}
