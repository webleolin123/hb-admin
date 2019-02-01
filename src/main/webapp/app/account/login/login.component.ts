import {OnInit, Component, AfterViewInit, Renderer, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Principal, LoginService} from '../../core';

import {StateStorageService} from '../../core/auth/state-storage.service';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../core/user/user.service";
import {EnterpriseInfo} from "./enterprise-info.model";
import {HttpResponse} from '@angular/common/http';
import {BASE_API_URL} from '../../app.constants';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    private subscription: Subscription;

    baseApiUrl: any;
    theAgentIdType: any;
    isFirstCheckFail: any;
    constructor(private eventManager: JhiEventManager,
                private loginService: LoginService,
                private stateStorageService: StateStorageService,
                private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                private alertService: JhiAlertService) {
        this.credentials = {};
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            console.log(params);
            if (params.isLogout == 2) {
                this.loginService.logout();
            }
        });
        this.baseApiUrl = BASE_API_URL;
        this.isFirstCheckFail = 0;

        this.userService.getEnterpriseInfo({
            pageUrl: this.baseApiUrl + '#/',
            isFirstCheckFail: this.isFirstCheckFail
        }).subscribe(
            (res: HttpResponse<EnterpriseInfo>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }

    private onSuccess(data) {
        console.log(data);
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then((res) => {
            console.log(res);
            this.authenticationError = false;
            this.router.navigate(['']);
            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
        }).catch(() => {
            this.authenticationError = true;
        });
    }

    register() {
        this.router.navigate(['account/register']);
    }

    requestResetPassword() {
        this.router.navigate(['/reset', 'request']);
    }
}
