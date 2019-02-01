import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {HttpResponse} from '@angular/common/http';
// import {Shelves} from './load-upload.model';
// import {ShelvesService} from './load-upload.service';
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
@Component({
    selector: 'jhi-load-upload-dialog',
    templateUrl: './load-upload-add.component.html'
})
export class LoadUploadAddComponent implements OnInit {
    shelve: ApproverCommonInfo;
    isSaving: Boolean;
    departments: Department[];
    departmentUsers: DepartmentUser[];
    departmentId: any;
    copyToDepartments: Department[];
    copyToDepartmentUsers: DepartmentUser[];
    copyToDepartmentId: any;
    // selectedApproverList: any;
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
    data:any;
    applyReason: string;
    constructor(public activeModal: NgbActiveModal,
                private shelveService: MyHttpService,
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
        // this.selectedApproverList = [];
        this.selectedCopyToList = [];
        this.loadAllDepartments();
        // this.selectedShop = new Shop();
        // this.selectedBrand = new Brand();
        // this.selectedGood = new Good();
    }
    load() {
        if (this.shelveService.approverCommonId) {
            this.shelveService.find(this.shelveService.approverCommonId).subscribe((response) => {
                this.shelve = response.body;
                console.log(response);
            })
        } else {
            this.shelve = new ApproverCommonInfo;
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
                this.data=res.body;
                this.brands = this.data.content;
                // console.log(res.body);
            },
            (err) => alert(err));
    }
    flag = true;
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
            this.shelve.goodId = this.selectedGoodId;
        }
    }
    // 选择申请类型
    onSelectedApplyType(evnet) {
        // console.log(this.shelve.applyType);
        // this.calcCompanyshelve();
    }

    // // 费用说明
    // desc() {
    //     if (this.shelve.applyType) {
    //         this.calcCompanyshelve();
    //     } else {
    //         alert('请先选择申请类型');
    //         this.shelve.applyType = null;
    //     }
    // }

    // // 开始时间
    // chooseStartDate() {
    //     this.calcCompanyshelve();
    // }
    //
    // // 结束时间
    // chooseEndDate() {
    //     this.calcCompanyshelve();
    // }
    //
    // // 是否厂家支持
    // onSelectedSupportedByFactory(event) {
    //     console.log(this.shelve.isSupportedByFactory);
    // }

    // 厂家费用说明
    // descByFactory() {
    //     this.calcFactoryshelve();
    // }
    //
    // calcCompanyshelve() {
    //     if (this.shelve.applyType && this.shelve.pershelve && this.shelve.startDate && this.shelve.endDate) {
    //         if (this.shelve.applyType == 1) {
    //             this.iDays = Math.floor(Math.abs(Date.parse(this.shelve.startDate) - Date.parse(this.shelve.endDate)) / (24 * 3600 * 1000) + 1); // 相差天数
    //             let countshelve = this.shelve.pershelve * this.iDays; // 费用生成
    //             this.companyshelve = countshelve.toFixed(2);
    //         } else {
    //             this.iMonth = Math.floor(Math.abs(Date.parse(this.shelve.startDate) - Date.parse(this.shelve.endDate)) / (30 * 24 * 3600 * 1000) + 1); // 相差月数
    //             let countshelve = this.shelve.pershelve * this.iMonth; // 费用生成
    //             this.companyshelve = countshelve.toFixed(2);
    //         }
    //         this.calcFactoryshelve();
    //     }
    // }

    // // 计算厂家支持产生费用和总费用
    // calcFactoryshelve() {
    //     if (this.shelve.applyType &&
    // this.shelve.pershelve && this.shelve.startDate && this.shelve.endDate && this.shelve.isSupportedByFactory == 1 && this.shelve.pershelveOfSupport) {
    //         if (this.shelve.applyType == 1) {
    //             this.factoryshelve = Math.floor(this.shelve.pershelveOfSupport * this.iDays); // 费用生成
    //         } else {
    //             this.factoryshelve = Math.floor(this.shelve.pershelveOfSupport * this.iMonth); // 费用生成
    //         }
    //     }
    //
    //     this.shelve.totalshelve = this.companyshelve - this.factoryshelve.toFixed(2);
    // }

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
        // const index = this.selectedApproverList.indexOf(approver);
        // if (index > -1) {
        //     this.selectedApproverList.splice(index, 1)
        // }
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
        this.shelve.approveInfoDTO.status = 1;
        // this.shelve.approveInfoDTO.approver = [];
        this.shelve.approveInfoDTO.copyTo = [];
        // this.selectedApproverList.forEach((approver) => {
        //     if (approver != null) {
        //         this.shelve.approveInfoDTO.approver.push(approver);
        //     }
        // });
        this.selectedCopyToList.forEach((copyTo) => {
            if (copyTo != null) {
                this.shelve.approveInfoDTO.copyTo.push(copyTo);
            }
        });
        this.shelve.approveInfoDTO.applyReason = this.applyReason;
        // this.shelve.applyTypeOfSupport = this.shelve.applyType;
        if (this.shelve.id !== null) {
            this.shelveService.update(this.shelve).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.shelveService.create(this.shelve).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }
    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'shelveListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }
    private onSaveError() {
        this.isSaving = false;
    }

}
