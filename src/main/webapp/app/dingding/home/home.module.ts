import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home.component';
import { homeComponent,homeRoute } from './home.route';
import {HomeSomeListComponent} from "./home-someList.component";
import {MyHttpService} from '../../common/http/myHttp.service';
import {HbadminCommondModule} from '../../common';
import {HomeSomeListDetailComponent} from "./home-someList-detail.component";
const home_COMPONENTS = [
    homeComponent,
];
const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            ...homeRoute,
        ],
    },
];
@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    ThemeModule,
    RouterModule,
    RouterModule.forChild(routes),
    HbadminCommondModule,
  ],
  declarations: [...home_COMPONENTS],
  entryComponents: [
      HomeSomeListComponent,
      HomeSomeListDetailComponent,
    ],
   providers: [
       MyHttpService,
    ],
})
export class HomeModule { }
