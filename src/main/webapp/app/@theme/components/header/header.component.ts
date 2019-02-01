import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {Principal} from "../../../core/auth/principal.service";
import {IMAGE_API_URL} from '../../../app.constants';
import {Router} from "@angular/router";
@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    @Input() position = 'normal';

    user: any;
    name;

    baseImageUrl: string;
    userMenu = [
        {
            title: '个人主页',
            link: '/systems/system/personal'
        },
        {
            title: '修改密码',
            link: '/systems/system/change-psw'
        },
        {
            title: '退出登录',
            link: '/account/login/2'
        }
    ];

    chatUs = [
        {title: '联系我们：0591-88309555'}
    ]

    notification = [
        {
            title: '消息通知',
            link: '/systems/messages/message'
        }
    ]

    constructor(private sidebarService: NbSidebarService,
                private menuService: NbMenuService,
                private analyticsService: AnalyticsService,
                private router: Router,
                private principal: Principal) {
        this.baseImageUrl = IMAGE_API_URL;
    }

    ngOnInit() {
        this.principal.identity(true).then((account) => {
            if (account != null) {
                this.user = account;
                if (account.imageUrl != '' && account.imageUrl != null) {
                    this.user.picture = IMAGE_API_URL + account.imageUrl.substring(0, 32);
                    console.log('IMAGE_API_URL',IMAGE_API_URL);
                    console.log('account.imageUrl',account.imageUrl);
                    console.log('this.user.picture',this.user.picture);
                } else {
                    this.user.picture = '../../../content/images/defaultAvatar.png';
                }

                if (account.nickname != '' && account.nickname != null) {
                    this.name = account.nickname;
                } else {
                    this.name = account.login;
                }
            }
            else {
                this.router.navigate(['account/login/1']);
            }
        });
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }

    toggleSettings(): boolean {
        this.sidebarService.toggle(false, 'settings-sidebar');
        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }

    startSearch() {
        this.analyticsService.trackEvent('startSearch');
    }
}
