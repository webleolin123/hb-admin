import {Component, OnDestroy, OnInit} from '@angular/core';
import {Principal} from "../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import { Router} from "@angular/router";
import {UserService} from "../../../core/user/user.service";
import {ToasterService, ToasterConfig, Toast, BodyOutputType} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
    selector: 'jhi-change-psw',
    templateUrl: './change-psw.component.html',
    styleUrls: ['./change-psw.scss']
})
export class ChangePswComponent implements OnInit {

    currentAccount: any;
    password: any;
    confirmPassword: any;
    config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-center',
        timeout: 2000,
        newestOnTop: true,
        tapToDismiss: true,
        preventDuplicates: false,
        animation: 'fade',
        limit: 5,
    });
    constructor(private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private router: Router,
                private userService: UserService,
                private toasterService: ToasterService,) {

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    changePassword() {
        if (this.password && this.confirmPassword) {
            if (this.password === this.confirmPassword) {
                this.userService.changePsw(this.password).subscribe((res) => {
                    const toast: Toast = {
                        type: 'default',
                        title: '修改密码成功',
                        timeout: 1000,
                        showCloseButton: true,
                        bodyOutputType: BodyOutputType.TrustedHtml,
                    };
                    this.toasterService.popAsync(toast);
                    this.router.navigate(['/account/login']);
                }, (err) => {
                    alert('修改密码错误，请重试！');
                })
            } else {
                alert('两次密码输入不一致，请重新输入！');
            }
        } else {
            alert('请输入完成信息');
        }
    }
}
