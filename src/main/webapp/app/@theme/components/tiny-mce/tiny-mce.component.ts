import {Component, OnDestroy, AfterViewInit, Output, EventEmitter, ElementRef} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, UPLOAD_IMAGE_API, IMAGE_API_URL} from '../../../app.constants';
declare var tinymce: any;
@Component({
    selector: 'ngx-tiny-mce',
    template: '',
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {

    @Output() editorKeyup = new EventEmitter<any>();

    editor: any;

    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + UPLOAD_IMAGE_API,
        method: 'POST',
        itemAlias: 'uploadedfile'
    });
    headers: Headers;
    imageUrl: string;
    imageMd5: string;

    constructor(private host: ElementRef) {
    }

    public fileInputChangeHandler(): void {
        let x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                let tempRes = JSON.parse(response);
                this.imageUrl = IMAGE_API_URL + tempRes.info.md5;
                this.imageMd5 = tempRes.info.md5;
                let tempInput = <HTMLInputElement>document.getElementById('temp');
                let fileInput = <HTMLInputElement>document.getElementById(tempInput.value);
                fileInput.value = this.imageUrl;
                // 此处做input上传组件的重置
                (<HTMLFormElement>document.getElementById("image_form")).reset();
            } else {
                // 上传文件后获取服务器返回的数据错误
                console.log(response);
            }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }

    ngAfterViewInit() {
        tinymce.init({
            target: this.host.nativeElement,
            plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample'],
            skin_url: 'assets/skins/lightgray',
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor | fontselect | fontsizeselect',
            image_advtab: true,
            codesample_content_css: '/content/css/prism.css',
            //文件和图片上传相关的选项
            file_browser_callback_types: 'image',
            file_browser_callback: function (field_name, url, type, win) {
                // console.log(type+"----"+url+"----"+field_name);
                // console.log(type == 'image');
                if (type == 'image') {
                    let event = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });

                    let fileInput = document.getElementById('img_input');
                    let tempInput = <HTMLInputElement>document.getElementById('temp');
                    tempInput.value = field_name;
                    fileInput.dispatchEvent(event);
                }
            },
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    this.editorKeyup.emit(editor.getContent());
                });
            },
            height: '320',
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}
