import {Component, OnInit} from '@angular/core';

import {SECTIONS_ITEMS, ROLES_USER_ITEMS, ROLES_FINANCE_ITEMS, ROLES_HR_ITEMS } from './dingding-menu';
import {Principal} from "../core/auth/principal.service";
import {Router} from "@angular/router";

@Component({
    selector: 'ngx-DingDing',
    template: `
    <ngx-sample-layout>
    <nb-menu [items]="menu" *jhiHasAnyAuthority="'ROLE_ADMIN'"></nb-menu>
    <nb-menu [items]="rolesUserMenu" *jhiHasAnyAuthority="'ROLE_APPRAISE'"></nb-menu>
    <nb-menu [items]="financeUserMenu" *jhiHasAnyAuthority="'ROLE_FINANCE'"></nb-menu>
        <nb-menu [items]="hrMenu" *jhiHasAnyAuthority="'ROLE_HR'"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class DingDingComponent implements OnInit {

    menu = SECTIONS_ITEMS;
    rolesUserMenu = ROLES_USER_ITEMS;
    financeUserMenu = ROLES_FINANCE_ITEMS;
    hrMenu = ROLES_HR_ITEMS;
    user: any;

    constructor(private principal: Principal,
                private router: Router) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            if (account != null) {
                // console.log(account.toString());
                // this.user = account;
                // console.log(this.user);
            }
            else {
                console.log('not_login');
                this.router.navigate(['/account/login/1']);
            }
        });
    }
}
