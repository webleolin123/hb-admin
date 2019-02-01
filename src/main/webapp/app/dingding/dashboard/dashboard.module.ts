import {NgModule} from '@angular/core';
import {ChartModule} from 'angular2-chartjs';
import {ThemeModule} from '../../@theme/theme.module';
import {DashboardComponent} from './dashboard.component';
import {HbadminSharedModule} from '../../shared';
import {HbadminCoreModule} from '../../core';
import {HbadminSharedCommonModule} from '../../shared';
import {HbadminCommondModule} from '../../common';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
    imports: [
        ThemeModule,
        NgxEchartsModule,
        ChartModule,
        HbadminSharedModule,
        HbadminCoreModule,
        HbadminCommondModule,
        HbadminSharedCommonModule,
    ],
    declarations: [
        DashboardComponent,
    ],
})
export class DashboardModule {
}
