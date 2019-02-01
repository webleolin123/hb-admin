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
import {
    WORKFLOW_REDUCES_API,
} from '../../../../../app.constants';
@Component({
  selector: 'full-reduce-add',
  templateUrl: './full-reduce-add.component.html',
})
export class FullReduceAddComponent implements OnInit,OnDestroy{
    reduce: ApproverCommonInfo;
    isSaving: Boolean;
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
    data:any;
    selectedBrandId:any=0;//选择品牌的id
    selectedShopId:any=0;//选择店铺的id
    selectedGoodId:any=0;//选择商品的id
    selectedObjApplyType:any=0;//使用对象
    applyReason: string;
    reducePrice:any;//满减面额
    limitPrice:any;//满减门槛
    breakingPrice:any=0;//是否破价格
    reduceType:any=0;//满减类型
    constructor(public activeModal: NgbActiveModal,
                private reduceService: MyHttpService,
                private eventManager: JhiEventManager,
                private departmentService: DepartmentService,
                private shopService: ShopService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        this.reduceService.resourceUrl=WORKFLOW_REDUCES_API;
    }
    ngOnInit() {
        this.isSaving = false;
        this.selectedBrandId=0;
        this.selectedShopId=0;
        this.selectedGoodId=0;
        this.load();
        this.loadShop();
        this.selectedApproverList = [];
        this.selectedCopyToList = [];
        this.loadAllDepartments();
        // this.selectedShop = new Shop();
        // this.selectedBrand = new Brand();
        // this.selectedGood = new Good();
    }
    ngOnDestroy(){

    }
    load() {
        if (this.reduceService.approverCommonId) {
            this.reduceService.find(this.reduceService.approverCommonId).subscribe((response) => {
                this.reduce = response.body;
                console.log(response);
            })
        } else {
            this.reduce = new ApproverCommonInfo;
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
    change(){
        this.reduceType=this.selectedObjApplyType;
    }
    // 选择申请类型
    onSelectedApplyType(evnet) {
        // console.log(this.reduce.applyType);
        // this.calcCompanyreduce();
    }

    // // 费用说明
    // desc() {
    //     if (this.reduce.applyType) {
    //         this.calcCompanyreduce();
    //     } else {
    //         alert('请先选择申请类型');
    //         this.reduce.applyType = null;
    //     }
    // }

    // 开始时间
    // chooseStartDate() {
    //     this.calcCompanyreduce();
    // }
    // 结束时间
    // chooseEndDate() {
    //     this.calcCompanyreduce();
    // }
    // // 是否厂家支持
    // onSelectedSupportedByFactory(event) {
    //     console.log(this.reduce.isSupportedByFactory);
    // }

    // 厂家费用说明
    // descByFactory() {
    //     this.calcFactoryreduce();
    // }
    //
    // calcCompanyreduce() {
    //     if (this.reduce.applyType && this.reduce.perreduce && this.reduce.startDate && this.reduce.endDate) {
    //         if (this.reduce.applyType == 1) {
    //             this.iDays = Math.floor(Math.abs(Date.parse(this.reduce.startDate) - Date.parse(this.reduce.endDate)) / (24 * 3600 * 1000) + 1); // 相差天数
    //             let countreduce = this.reduce.perreduce * this.iDays; // 费用生成
    //             this.companyreduce = countreduce.toFixed(2);
    //         } else {
    //             this.iMonth = Math.floor(Math.abs(Date.parse(this.reduce.startDate) - Date.parse(this.reduce.endDate)) / (30 * 24 * 3600 * 1000) + 1); // 相差月数
    //             let countreduce = this.reduce.perreduce * this.iMonth; // 费用生成
    //             this.companyreduce = countreduce.toFixed(2);
    //         }
    //         this.calcFactoryreduce();
    //     }
    // }

    // // 计算厂家支持产生费用和总费用
    // calcFactoryreduce() {
    //     if (this.reduce.applyType && this.reduce.perreduce && this.reduce.startDate && this.reduce.endDate
    // && this.reduce.isSupportedByFactory == 1 && this.reduce.perreduceOfSupport) {
    //         if (this.reduce.applyType == 1) {
    //             this.factoryreduce = Math.floor(this.reduce.perreduceOfSupport * this.iDays); // 费用生成
    //         } else {
    //             this.factoryreduce = Math.floor(this.reduce.perreduceOfSupport * this.iMonth); // 费用生成
    //         }
    //     }
    //
    //     this.reduce.totalreduce = this.companyreduce - this.factoryreduce.toFixed(2);
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
        this.reduce.breakingPrice=this.breakingPrice;
        this.reduce.applyType=this.selectedObjApplyType;
        if(this.selectedObjApplyType=='0'){
            alert('请选择使用对象');
            return;
        }
        if(this.breakingPrice=='0'){
            alert('请选择是否破价');
            return;
        }
        this.isSaving = true;
        this.reduce.limitPrice=this.limitPrice;
        this.reduce.reducePrice=this.reducePrice;
        this.reduce.approveInfoDTO.status = 1;
        this.reduce.approveInfoDTO.approver = [];
        this.reduce.approveInfoDTO.copyTo = [];
        this.selectedApproverList.forEach((approver) => {
            if (approver != null) {
                this.reduce.approveInfoDTO.approver.push(approver);
            }
        });
        this.selectedCopyToList.forEach((copyTo) => {
            if (copyTo != null) {
                this.reduce.approveInfoDTO.copyTo.push(copyTo);
            }
        });
        this.reduce.approveInfoDTO.applyReason = this.applyReason;
        // this.reduce.applyTypeOfSupport = this.reduce.applyType;
        if (this.reduce.id !== null) {
            this.reduce.applyType=
            this.reduceService.update(this.reduce).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.reduceService.create(this.reduce).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }
    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'reduceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }
    private onSaveError() {
        this.isSaving = false;
    }
}
