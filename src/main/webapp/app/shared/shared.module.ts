import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {
    HbadminSharedLibsModule,
    HbadminSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
} from './';
@NgModule({
    imports: [
        HbadminSharedLibsModule,
        HbadminSharedCommonModule,
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
    ],
    providers: [
        DatePipe,
        NgbActiveModal,
    ],
    entryComponents: [JhiLoginModalComponent,
    ],
    exports: [
        HbadminSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HbadminSharedModule {}
