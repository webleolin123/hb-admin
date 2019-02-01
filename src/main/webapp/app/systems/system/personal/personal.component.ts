/**
 * Created by Administrator on 2018/7/31.
 */
import {Component, OnInit} from '@angular/core';
import {Principal} from "../../../core/auth/principal.service";
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, UPLOAD_IMAGE_API, IMAGE_API_URL} from '../../../app.constants';
import * as $ from 'jquery';
import {User} from "../../../core/user/user.model";
import {UserService} from "../../../core/user/user.service";
import {ToasterService, ToasterConfig, Toast, BodyOutputType} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
    selector: 'jhi-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.scss']
})
export class PersonalComponent implements OnInit {

    account: User;

    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + UPLOAD_IMAGE_API,
        method: 'POST',
    });
    imageUrl: string;
    imageMd5: string;
    baseImageUrl: any;
    // toast配置
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
                private userService: UserService,
                private toasterService: ToasterService,) {

    }

    ngOnInit() {
        this.baseImageUrl = IMAGE_API_URL;
        this.account = new User;
        this.principal.identity(true).then((account) => {
            this.account = account;
        });
    }

    selectedFileOnChanged() {
        let x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                let tempRes = JSON.parse(response);
                this.imageUrl = IMAGE_API_URL + tempRes.info.md5;
                this.imageMd5 = tempRes.info.md5;
                this.account.imageUrl = this.imageMd5;
            } else {
                // 上传文件后获取服务器返回的数据错误
                console.log(response);
            }
        };
        this.uploader.queue[x].upload(); // 开始上传

    }

    save() {
        if (this.account.birthday) {
            this.account.birthday = $('input#birthday').val();
        }
        this.account.sex = $("div.sex label input[name='sex']:checked").val();
        if(this.imageMd5){
            this.account.imageUrl = this.imageMd5;
        }
        if (this.account.login) {
            this.userService.update(this.account).subscribe((res) => {
                var toast: Toast = {
                    type: 'default',
                    title: '',
                    body: '保存修改个人资料成功！',
                    timeout: 2000,
                    showCloseButton: true,
                    bodyOutputType: BodyOutputType.TrustedHtml,
                };
                this.toasterService.popAsync(toast);
            })
        }

    }
}
