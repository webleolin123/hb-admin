import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule'},
    {path: 'account', loadChildren: 'app/account/account.module#HbadminAccountModule'},
    {path: 'dingding', loadChildren: 'app/dingding/dingding.module#DingDingModule'}, // 钉钉oa
    {path: 'systems', loadChildren: 'app/systems/systems.module#SystemsModule'}, // 系统
    {path: '', redirectTo: 'dingding', pathMatch: 'full'},
    {path: '**', redirectTo: 'dingding'},
];

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class HbadminAppRoutingModule {
}
