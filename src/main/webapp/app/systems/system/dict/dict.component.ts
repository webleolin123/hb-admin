import {Component, OnInit, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';
import {HttpResponse} from '@angular/common/http';
import {Principal} from '../../../core';
import {DictService} from './dict.service';
import {Dict} from './dict.model';
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, UPLOAD_IMAGE_API} from '../../../app.constants';
import {Headers} from '@angular/http';
import {NbThemeService} from "@nebular/theme";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DictAddComponent} from "./dict-add.component";
import {DictDetailComponent} from "./dict-detail.component";
import * as $ from 'jquery';
import {UserService} from "../../../core/user/user.service";
@Component({
    selector: 'jhi-dict',
    templateUrl: './dict.component.html',
    styleUrls: ['../../../../content/scss/table.scss']
})
export class DictComponent implements OnInit,OnDestroy {
    currentAccount: any;
    mainDict: Dict[]; // 主字典变量
    childDict: Dict[];// 子字典变量
    exportDatas: Dict[]; // 导出excell的数据变量
    array: any;  // 数组容器
    data: any; // 对象容器
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    rABS: boolean;  // 读取完成的数据// 是否将文件读取为二进制字符串
    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + UPLOAD_IMAGE_API,
        method: 'POST',
        itemAlias: 'uploadedfile'
    });
    headers: Headers;
    imageUrl: string;
    imageMd5: string;

    // 按钮主题相关
    themeName = 'default';
    settingsBtn: Array<any>;
    themeSubscription: any;

    kind: any;

    singleDict: Dict;
    searchItem: any;

    constructor(private dictService: DictService,
                private alertService: JhiAlertService,
                private principal: Principal,
                private eventManager: JhiEventManager,
                private themeService: NbThemeService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.themeName = theme.name;
            this.init(theme.variables);
        });

        this.itemsPerPage = 15;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = 1;
            this.previousPage = 1;
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.registerChangeInUsers();
            this.queryMainDict();
        });

        this.array = [];
        this.rABS = false;

        $('div#dictNav').on('click', 'ul.accordion li.main div.link', function () {
            $(this).siblings('ul.submenu').toggle();
            $(this).parent().siblings().children('ul.submenu').hide();
        });
    }

    // 初始化 添加、取消和确认按钮
    init(colors: any) {
        this.settingsBtn = [{
            class: 'btn-hero-primary',
            container: 'primary-container',
            title: 'Primary Button',
            buttonTitle: '添加新数据',
            default: {
                gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
                gradientRight: colors.primary,
            },
            cosmic: {
                gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
                gradientRight: colors.primary,
                bevel: `shade(${colors.primary}, 14%)`,
                shadow: 'rgba (6, 7, 64, 0.5)',
                glow: `adjust-hue(${colors.primary}, 10deg)`,
            },
        }];
    }

    selectedImgFileOnChanged() {
        let x = this.uploader.queue.length - 1;
        this.uploader.queue[0].onSuccess = (response, status, headers) => {
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                let tempRes = JSON.parse(response);
                // this.imageUrl = IMAGE_API_URL + tempRes.info.md5;
                // this.imageMd5 = tempRes.info.md5;
                console.log(response)
            } else {
                // 上传文件后获取服务器返回的数据错误
                console.log(response);
            }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('mainDictListModification', (response) => this.queryMainDict());
        this.eventManager.subscribe('childDictListModification', (response) => this.loadChild(this.kind));
    }

    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }

    queryMainDict() {
        this.dictService.queryMainList({
            parentId: 1
        }).subscribe((res: HttpResponse<Dict[]>) => this.onQueryMainDictSuccess(res.body),
            (res: any) => this.onError(res.json()));
    }

    // 点击加载子字典
    loadChild(kind) {
        this.kind = kind;
        this.dictService.queryAllByParentKind({
            parentKind: this.kind
        }).subscribe((res: HttpResponse<Dict[]>) => this.onQueryChildDictSuccess(res.body),
            (res: any) => this.onError(res.json()));
    }

    private onQueryMainDictSuccess(data) {
        console.log(data);
        this.mainDict = data;
    }

    private onQueryChildDictSuccess(data) {
        this.childDict = data
    }

    trackIdentity(index, item: Dict) {
        return item.id;
    }

    sort() {
        // const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        // if (this.predicate !== 'id') {
        //     result.push('id');
        // }
        // return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/systems/system/dict'], {
            queryParams: {
                page: this.page,
            }
        });
        this.queryMainDict();
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    addNewDict() {
        this.dictService.dictId = null;
        this.dictService.parentId = null;
        const activeModal = this.modalService.open(DictAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    add(id) {
        this.dictService.dictId = null;
        this.dictService.parentId = id;
        const activeModal = this.modalService.open(DictAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    // 编辑
    edit(id) {
        this.dictService.dictId = id;
        const activeModal = this.modalService.open(DictAddComponent, {size: 'lg', container: 'nb-layout'});
    }

    // 查看详情
    check(id) {
        this.dictService.find(id).subscribe((response) => {
            this.singleDict = response.body;
        });
    }

    search() {
        this.dictService.searchByKind({kind: this.searchItem}).subscribe((response) => {
            this.singleDict = response.body;
        });
    }

    delete(id) {
        if (window.confirm('确定删除该条目?')) {
            this.dictService.delete(id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'mainDictListModification',
                    content: 'Deleted a dict'
                });
                this.eventManager.broadcast({
                    name: 'childDictListModification',
                    content: 'Deleted a dict'
                });
            });
        }
    }

    //取所有的字典
    export() {
        this.dictService.query({
            size: 999999
        }).subscribe((res: HttpResponse<Dict[]>) => this.onQueryExportDataSuccess(res),
            (res: Response) => this.onError(res.json()));
    }

    private onQueryExportDataSuccess(data) {
        this.exportDatas = data.body;
        // console.log(data.body);
        this.exportDatas.forEach((value, index, array) => {
            this.data = {
                num1: value.kind,
                num2: value.seq,
                num3: value.value,
                num4: value.text,
                num5: value.isSystem,
                num6: value.isReadOnly,
                num7: value.remarks,
                num8: value.data,
                num9: value.parentId
            };
            this.array.push(this.data);
            // console.log(this.array)
        });
        this.userService.exportCsv({
            title: ["kind", "seq", "jhi_value", "text", "is_system", "is_read_only", "remarks", "data", "parent_id",],
            titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9",],
            data: this.array
        }, "dict.csv");
    }

    filename: string;
    display: boolean;

    import(info: any) {
        this.filename = ""; //文本框中的值为空
        this.display = true;
    }

    // 下载数据模版
    // down() {
    //     this.exportCsv({
    //         title: ["id", "kind", "seq", "value", "text", "isSystem", "isReadOnly", "remarks", "data", "parentId",],
    //         titleForKey: ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num10"],
    //         data: []
    //     });
    // }

    show(el: HTMLElement) {
        el.click();
    }

    selectedFileOnChanged(event: any) {
        //打印文件选择名称
        console.log(event);
        console.log(event.target.value);
        this.filename = event.target.value;
    }

    public fUploader: FileUploader = new FileUploader({
        url: BASE_API_URL + UPLOAD_IMAGE_API,
        // url:"http://192.168.0.92:8080/",
        method: "POST",
        itemAlias: "multfile",
        allowedFileType: ["xls", "xlxs"]

    });

    upload() {
        if (this.filename == "") {
            alert("没有选择文件，请选择文件");
            return;
        }
        this.uploadFile();
        this.display = false;
    }

    uploadFile() {
        //上传
        // this.fUploader.queue[0].onSuccess =function(response, status, headers){
        //     //上传文件成功
        //     if(status==200){
        //         //上传文件后后去服务器返回的数据
        //         let tempRes = JSON.parse(response);
        //         console.log(tempRes);
        //         alert("上传成功");
        //     }else{
        //         //上传文件后湖区服务器返回的数据错误
        //         alert("失败");
        //     }
        // };
        this.uploader.queue[0].upload();
    }
}
