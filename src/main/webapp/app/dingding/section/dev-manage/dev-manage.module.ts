import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule} from '@angular/router';

import {
    contractReviewComponent,
    contractReviewRoute,
    DevManageComponent,
    devProjectComponent,
    devProjectRoute,
    IDDesignRoute, meetingComponent, meetingRoute, negotiationReportComponent,
    negotiationReportRoute, packageDesignComponent,
    packageDesignRoute, pageDesignComponent,
    pageDesignRoute, procurementReviewComponent,
    procurementReviewRoute,
    projectManageComponent,
    projectManageRoute, samplingComponent,
    samplingRoute, submitReportComponent,
    submitReportRoute, videoShootComponent,
    videoShootRoute
} from "./";
import {IDDesignComponent} from "./designManage/ID-design/ID-design.component";

const DevManage_COMPONENTS = [
    DevManageComponent,
    devProjectComponent,
    projectManageComponent,
    contractReviewComponent,
    IDDesignComponent,
    negotiationReportComponent,
    meetingComponent,
    packageDesignComponent,
    pageDesignComponent,
    procurementReviewComponent,
    samplingComponent,
    submitReportComponent,
    videoShootComponent,

];
const routes: Routes = [
    {
        path: '',
        component: DevManageComponent,
        children: [
            ...devProjectRoute,
            ...projectManageRoute,
            ...packageDesignRoute,
            ...videoShootRoute,
            ...pageDesignRoute,
            ...IDDesignRoute,
            ...samplingRoute,
            ...negotiationReportRoute,
            ...submitReportRoute,
            ...contractReviewRoute,
            ...procurementReviewRoute,
            ...meetingRoute,
        ],
    },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...DevManage_COMPONENTS],
    providers:[

    ],
})
export class DevManageModule { }
