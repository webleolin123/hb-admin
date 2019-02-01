/**
 * Created by Administrator on 2018/7/9.
 */
import {Component, OnInit} from '@angular/core';

import {SYSTEMS_ITEMS} from './systems-menu';
import {Principal} from "../core/auth/principal.service";
import {Router} from "@angular/router";

@Component({
    selector: 'ngx-systems',
    template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class SystemsComponent implements OnInit {

    menu = SYSTEMS_ITEMS;
    user: any;

    constructor(private principal: Principal,
                private router: Router) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            if (account != null) {
                console.log(account.toString());
            }
            else {
                console.log('not_login');
                this.router.navigate(['account/login']);
            }
        });
    }

}
