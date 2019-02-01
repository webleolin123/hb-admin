import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {NbThemeService} from "@nebular/theme";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {HbadminSharedModule} from '../../shared';
import {HbadminCoreModule} from '../../core';
import {HbadminSharedCommonModule} from '../../shared';
import {HbadminCommondModule} from '../../common/common.module';
import {FileUploadModule} from 'ng2-file-upload';
import {ToasterService, ToasterModule} from 'angular2-toaster';
// import {CustomPipe} from "../../common/customPipe/custom-pipe";
import {  RolesManageAddRoleComponent,} from "./rolesManage/roles-manage/roles-manage-add-role.component";
import {  PersonnelManageDetailComponent,} from "./personnelManage/personnel-manage/personnel-manage-detail.component";
import {
    AuthorityContainerComponent,
    authorityComponent,
    authorityRoute,
    AuthorityService,
    businessModuleComponent,
    businessModuleRoute,
    BusinessModuleService,
    departmentRoute,
    departmentComponent,
    DepartmentService,
    rolesManageRoute,
    personnelManageRoute, rolesManageComponent, personnelManageComponent,
} from './';
import {AuthorityAddComponent} from "./authority-settings/authority-add.component";
import {AuthorityEditComponent} from "./authority-settings/authority-edit.component";
import {AuthorityDetailComponent} from "./authority-settings/authority-detail.component";
import {BusinessModuleAddComponent} from "./business-module/business-module-add.component";
import {BusinessModuleDetailComponent} from "./business-module/business-module-detail.component";
import {BusinessModuleChooseModuleComponent} from "./business-module/business-module-choose-module.component";
const Authority_COMPONENTS = [
    // CustomPipe,
    AuthorityContainerComponent,
    authorityComponent,
    businessModuleComponent,
    departmentComponent,
    rolesManageComponent,
    personnelManageComponent,
];
const routes: Routes = [
    {
        path: '',
        component: AuthorityContainerComponent,
        children:[
            ...authorityRoute,
            ...businessModuleRoute,
            ...departmentRoute,
            ...rolesManageRoute,
            ...personnelManageRoute,
        ],
    }
];
@NgModule({
    imports: [
        ThemeModule,
        CommonModule,
        HbadminSharedModule,
        HbadminCoreModule,
        HbadminSharedCommonModule,
        FileUploadModule,
        ToasterModule,
        RouterModule.forChild(routes),
        HbadminCommondModule,
    ],
    declarations: [...Authority_COMPONENTS,],
    entryComponents: [
        AuthorityAddComponent,
        AuthorityEditComponent,
        AuthorityDetailComponent,
        BusinessModuleAddComponent,
        BusinessModuleDetailComponent,
        BusinessModuleChooseModuleComponent,
        RolesManageAddRoleComponent,
        PersonnelManageDetailComponent

    ],
    providers: [
        ToasterService,
        NbThemeService,
        NgbModal,
        AuthorityService,
        BusinessModuleService,
        DepartmentService,
    ]
})
export class AuthorityContainerModule {
}
