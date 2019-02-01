import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {HttpResponse} from '@angular/common/http';
import {ApproverCommonInfo} from '../../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../../common/http/myHttp.service';
import {Department} from '../../../../../common/http/department.model';
import {DepartmentUser} from '../../../../../common/http/department-user.model';
import {DepartmentService} from "../../../../authority/department/department.service";
import {Shop} from "../../../base-data/shop/shop.model";
import {Brand} from "../../../base-data/brand/brand.model";
import {ShopService} from "../../../base-data/shop/shop.service";
import {Good} from "../../../base-data/good/good.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploader} from 'ng2-file-upload';
import {BASE_API_URL, TASK_FILR_UPLOAD_API, IMAGE_API_URL} from '../../../../../app.constants';
@Component({
    selector: 'jhi-tao-ke-add-dialog',
    templateUrl: './tao-ke-add.component.html'
})
export class TaoKeAddComponent implements OnInit {
    taoKe: ApproverCommonInfo;
    isSaving: Boolean;
    uploader: FileUploader = new FileUploader({
        url: BASE_API_URL + TASK_FILR_UPLOAD_API,
        method: 'POST',
        itemAlias: 'uploadedfile'
    });
    headers: Headers;
    imageUrl: string;
    imageMd5: string;
    departments: Department[];
    departmentUsers: DepartmentUser[];
    departmentId: any;

    copyToDepartments: Department[];
    copyToDepartmentUsers: DepartmentUser[];
    copyToDepartmentId: any;
    selectedApproverList: any;
    selectedCopyToList: any;
    shops: Shop[];
    brands: Brand[];
    goods: Good[];
    // selectedShop: Shop;
    // selectedBrand: Brand;
    // selectedGood: Good;
    selectedBrandId:any=0;//选择品牌的id
    selectedShopId:any=0;//选择店铺的id
    selectedGoodId:any=0;//选择商品的id
    iDays: any; // 相差天数
    iMonth: any; // 相差月数
    companyPrice: any = 0; // 公司费用生成
    factoryPrice: any = 0; // 厂家费用生成
    applyReason: string;
    data:any;
    constructor(public activeModal: NgbActiveModal,
                private taoKeService: MyHttpService,
                private eventManager: JhiEventManager,
                private departmentService: DepartmentService,
                private shopService: ShopService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.load();
        this.loadShop();
        this.loadBrand();
        this.selectedApproverList = [];
        this.selectedCopyToList = [];
        this.loadAllDepartments();
        // this.selectedShop = new Shop();
        // this.selectedBrand = new Brand();
        // this.selectedGood = new Good();
    }
    load() {
        if (this.taoKeService.approverCommonId) {
            this.taoKeService.find(this.taoKeService.approverCommonId).subscribe((response) => {
                this.taoKe = response.body;
                console.log(response);
            })
        } else {
            this.taoKe = new ApproverCommonInfo;
        }
    }
    // 加载所有店铺
    loadShop() {
        this.shopService.queryShop({size: 99999}).subscribe(
            (res: HttpResponse<Shop[]>) => {
                this.shops = res.body;
            },
            (err) => alert(err))
    }
    // 加载所有品牌
    loadBrand() {
        this.shopService.queryBrand({size: 99999}).subscribe(
            (res: HttpResponse<Brand[]>) => {
                this.data = res.body;
                this.brands = this.data.content;
                // console.log(res.body);
            },
            (err) => alert(err));
    }
    flag= true;
    // 根据店铺和品牌加载商品
    loadGoodByShopIdAndBrandId() {
        if (this.flag == true) {
            this.shopService.queryShopGood({
                brandId: this.selectedBrandId,
                shopId: this.selectedShopId,
                size: 99999
            }).subscribe(
                (res: HttpResponse<Good[]>) => {
                    this.data = res.body;
                    this.goods = this.data.content;
                },
                (err: HttpResponse<any>) => {
                    console.log(err);
                }
            );
        } else {
            return;
        }

    }
    // 选择店铺
    onSelectedShop($event) {
        console.log(this.selectedShopId);
        this.loadGoodByShopIdAndBrandId();
    }
    // 选择品牌
    onSelectedBrand($event) {
        console.log(this.selectedBrandId);
        this.loadGoodByShopIdAndBrandId();
    }
    // 选择商品
    onSelectedGood(event) {
        if (this.selectedShopId && this.selectedBrandId) {
            this.loadGoodByShopIdAndBrandId();
            this.taoKe.goodId = this.selectedGoodId;
        }
    }
    // 选择费用类型
    onSelectedPriceType(evnet) {
        console.log(this.taoKe.priceType);
        this.calcCompanyPrice();
    }
    // 费用说明
    desc() {
        if (this.taoKe.priceType) {
            this.calcCompanyPrice();
        } else {
            alert('请先选择费用类型');
            this.taoKe.priceType = null;
        }
    }
    // 开始时间
    chooseStartDate() {
        this.calcCompanyPrice();
    }
    // 结束时间
    chooseEndDate() {
        this.calcCompanyPrice();
    }
    // 是否厂家支持
    onSelectedSupportedByFactory(event) {
        console.log(this.taoKe.isSupportedByFactory);
    }
    // 厂家费用说明
    descByFactory() {
        this.calcFactoryPrice();
    }
    calcCompanyPrice() {
        if (this.taoKe.priceType && this.taoKe.perPrice && this.taoKe.startDate && this.taoKe.endDate) {
            if (this.taoKe.priceType == 1) {
                this.iDays = Math.floor(Math.abs(Date.parse(this.taoKe.startDate) - Date.parse(this.taoKe.endDate)) / (24 * 3600 * 1000) + 1); // 相差天数
                const countPrice = this.taoKe.perPrice * this.iDays; // 费用生成
                this.companyPrice = countPrice.toFixed(2);
            } else {
                this.iMonth = Math.floor(Math.abs(Date.parse(this.taoKe.startDate) - Date.parse(this.taoKe.endDate)) / (30 * 24 * 3600 * 1000) + 1); // 相差月数
                const countPrice = this.taoKe.perPrice * this.iMonth; // 费用生成
                this.companyPrice = countPrice.toFixed(2);
            }
            this.calcFactoryPrice();
        }
    }
    // 计算厂家支持产生费用和总费用
    calcFactoryPrice() {
        if (this.taoKe.priceType && this.taoKe.perPrice && this.taoKe.startDate && this.taoKe.endDate && this.taoKe.isSupportedByFactory == 1 && this.taoKe.perPriceOfSupport) {
            if (this.taoKe.priceType == 1) {
                this.factoryPrice = Math.floor(this.taoKe.perPriceOfSupport * this.iDays); // 费用生成
            } else {
                this.factoryPrice = Math.floor(this.taoKe.perPriceOfSupport * this.iMonth); // 费用生成
            }
        }
        this.taoKe.totalPrice = this.companyPrice - this.factoryPrice.toFixed(2);
    }
    // 选择部门(默认审批人)
    onSelectedDepartment() {
        // let selectedDepartment = document.getElementById('selectedDepartment');
        // let index = selectedDepartment.selectedIndex;
        // if (index != 0) {
        //     this.departmentId = this.departments[index - 1].id;
        //     this.loadDepartmentUser();
        // } else {
        //     this.departmentId = null
        // }
    }
    // 选择部门成员(默认审批人)
    onSelectedDepartmentUser() {
        // let selectedDepartmentUser = document.getElementById('selectedDepartmentUser');
        // let index = selectedDepartmentUser.selectedIndex;
        // if (index != 0) {
        //     let dingPerson = new DingPerson;
        //     dingPerson.dingName = this.departmentUsers[index - 1].name;
        //     dingPerson.dingId = this.departmentUsers[index - 1].userid;
        //     dingPerson.isDefaultActor = 1;
        //     dingPerson.type = 2;
        //     let user = this.selectedApproverList.filter(user => user.dingId == dingPerson.dingId);
        //     if (user.length == 0) {
        //         this.selectedApproverList.push(dingPerson);
        //     } else {
        //         alert('已选择过此人');
        //     }
        // } else {
        //     this.defaultApprover.approver = null
        // }
    }
    // 删除已选审批人
    removeFormSelectedApproverList(approver) {
        const index = this.selectedApproverList.indexOf(approver);
        if (index > -1) {
            this.selectedApproverList.splice(index, 1)
        }
    }
    // 选择部门(默认抄送人)
    onSelectedCopyToDepartment() {
        // let selectedCopyToDepartment = document.getElementById('selectedCopyToDepartment');
        // let index = selectedCopyToDepartment.selectedIndex;
        // if (index != 0) {
        //     this.copyToDepartmentId = this.departments[index - 1].id;
        //     this.loadDepartmentUser();
        // } else {
        //     this.copyToDepartmentId = null
        // }
    }
    // 选择部门成员(默认抄送人)
    onSelectedCopyToDepartmentUser() {
        // let selectedCopyToDepartmentUser = document.getElementById('selectedCopyToDepartmentUser');
        // let index = selectedCopyToDepartmentUser.selectedIndex;
        // if (index != 0) {
        //     let dingPerson = new DingPerson;
        //     dingPerson.dingName = this.copyToDepartmentUsers[index - 1].name;
        //     dingPerson.dingId = this.copyToDepartmentUsers[index - 1].userid;
        //     dingPerson.isDefaultActor = 1;
        //     dingPerson.type = 3;
        //     let user = this.selectedCopyToList.filter(user => user.dingId == dingPerson.dingId);
        //     if (user.length == 0) {
        //         this.selectedCopyToList.push(dingPerson);
        //     } else {
        //         alert('已选择过此人');
        //     }
        // } else {
        //     this.defaultApprover.copyTo = null
        // }
    }
    // 删除已选审批人
    removeFormSelectedCopyToList(copytTo) {
        const index = this.selectedCopyToList.indexOf(copytTo);
        if (index > -1) {
            this.selectedCopyToList.splice(index, 1)
        }
    }
    // 加载所有部门
    loadAllDepartments() {
        this.departmentService.query({size: 10000}).subscribe(
            (res: HttpResponse<Department[]>) => {
                this.departments = res.body
            },
            (res: Response) => console.log(res)
        )
    }
    loadDepartmentUser() {
        if (this.departmentId) {
            this.departmentService.queryDepartmentUser({departmentId: this.departmentId}).subscribe(
                (res: HttpResponse<DepartmentUser[]>) => {this.departmentUsers = res.body;},
                (res: Response) => console.log(res)
            )
        }
        if (this.copyToDepartmentId) {
            this.departmentService.queryDepartmentUser({departmentId: this.copyToDepartmentId}).subscribe(
                (res: HttpResponse<DepartmentUser[]>) => {this.copyToDepartmentUsers = res.body;},
                (res: Response) => console.log(res)
            )
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    save() {
        this.isSaving = true;
        this.taoKe.status = 1;
        this.taoKe.approveInfoDTO.approver = [];
        this.taoKe.approveInfoDTO.copyTo = [];
        this.selectedApproverList.forEach((approver) => {
            if (approver != null) {
                this.taoKe.approveInfoDTO.approver.push(approver);
            }
        });
        this.selectedCopyToList.forEach((copyTo) => {
            if (copyTo != null) {
                this.taoKe.approveInfoDTO.copyTo.push(copyTo);
            }
        });
        this.taoKe.approveInfoDTO.applyReason = this.applyReason;
        this.taoKe.priceTypeOfSupport = this.taoKe.priceType;
        if (this.taoKe.id !== null) {
            this.taoKeService.update(this.taoKe).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.taoKeService.create(this.taoKe).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }
    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'taoKeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }
    private onSaveError() {
        this.isSaving = false;
    }
    selectedFileOnChanged() {
        const x = this.uploader.queue.length - 1;
        this.uploader.queue[x].onSuccess = (response, status, headers) => {
            console.log(response);
            console.log(status);
            console.log(headers);
            // 上传文件成功
            // if (status == 200) {
            //     // 上传文件后获取服务器返回的数据
            //     let tempRes = JSON.parse(response);
            //     this.imageUrl = IMAGE_API_URL + tempRes.info.md5;
            //     this.imageMd5 = tempRes.info.md5;
            //     console.log(this.imageMd5)
            // } else {
            //     // 上传文件后获取服务器返回的数据错误
            //     console.log(response);
            // }
        };
        this.uploader.queue[x].upload(); // 开始上传
    }
}
