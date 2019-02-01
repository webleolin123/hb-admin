/**
 * Created by Administrator on 2018/7/23.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Authority} from './authority.model';
import {AuthorityService} from './authority.service';
import {BusinessModule} from "../../authority/business-module/business-module.model";
import {BusinessModuleService} from "../../authority/business-module/business-module.service";
import {Department} from "../../../shared/user/department.model";
import {DingPerson} from "../../../shared/user/ding-person.model";
import {UserService} from "../../../core/user/user.service";
import * as $ from 'jquery';
@Component({
    selector: 'jhi-authority-dialog',
    templateUrl: './authority-add.component.html',
    styleUrls: ['./authority-add.scss']
})
export class AuthorityAddComponent implements OnInit {
    authority: Authority;
    isSaving: Boolean;
    businessModules: BusinessModule[];
    checked: any;
    isShelves: boolean; // 上下架
    isPicture: boolean; // 作图
    isShops: boolean; // 店铺
    isSelectedPeople: boolean; // 选择人员
    departments: Department[];
    departmentId: any;
    departmentUsers: DingPerson[];
    selectedDepartmentUserList: any;
    selectedDepartmentUserIdList: any;
    theDepartmentUser: DingPerson;
    approvePermissionType: any = 0;
    constructor(public activeModal: NgbActiveModal,
                private authorityService: AuthorityService,
                private eventManager: JhiEventManager,
                private businessModuleService: BusinessModuleService,
                private userService: UserService) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.isShelves = false;
        this.isPicture = false;
        this.isShops = false;
        this.isSelectedPeople = false;
        this.checked = [];
        this.selectedDepartmentUserList = [];
        this.selectedDepartmentUserIdList = [];
        this.authority = new Authority;
        this.load();
    }
    load() {
        if (this.authorityService.authorityId) {
            this.authorityService.find(this.authorityService.authorityId).subscribe((response) => {
                this.authority = response.body;
                console.log(response);
            })
        } else {
            this.authority = new Authority;
        }

        this.businessModuleService.getParentOrChildModules({level: 1}).subscribe(
            (res) => {
                this.businessModules = res.body;
            }, (err) => {
                console.log(err)
            }
        );
        this.userService.getDepartmentList().subscribe((res) => {
            this.departments = res.body;
        })
    }
    loadDepartmentUser() {
        if (this.departmentId) {
            this.userService.getDepartmentUser({
                departmentId: this.departmentId
            }).subscribe((res) => {
                this.departmentUsers = res.body;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    selectChildModule(module) {
        this.businessModules.forEach((m) => {
            m.childModules.forEach((c) => {
                if (c.approvePermissionType != module.approvePermissionType) {
                    c.isDisabled = true;
                }else{
                    c.isDisabled = false;
                }
            })
        });
        if(this.checked.indexOf(module.id) > -1){
            const index = this.checked.indexOf(module.id);
            this.checked.splice(index, 1)
        }else{
            this.checked.push(module.id);
        }
        if(this.checked.length==0){
            this.businessModules.forEach((m) => {
                m.childModules.forEach((c) => {
                    c.isDisabled = false;
                })
            });
        }
        console.log('module.approvePermissionType',module.approvePermissionType);
        console.log('module',module);
        if (module.approvePermissionType == 4) {
            // 作图radio可选
            if(this.isPicture){//点击过不再变 以支持同类型多选
                return;
            }
            this.isPicture = ! this.isPicture;
            this.isShelves = false;
            this.isShops = false;
        }
        else if (module.approvePermissionType == 3) {
            // 上下架radio可选
            if(this.isShelves){//点击过不再变 以支持同类型多选
                return;
            }
            this.isShelves = !this.isShelves;
            this.isPicture = false;
            this.isShops = false;
        }
        else if (module.approvePermissionType == 2) {
            // 店铺radio可选
            if(this.isShops){//点击过不再变 以支持同类型多选
                return;
            }
            this.isShops = !this.isShops;
            this.isPicture = false;
            this.isShelves = false;
        }
        else {
            this.isPicture = false;
            this.isShelves = false;
            this.isShops = false;
            return;
        }
    }
    addPeople() {
        this.isSelectedPeople = true;
    }
    selectedDepartment() {
        this.loadDepartmentUser();
    }
    selectedDepartmentUser() {
        const x = $('#selectedUser').get(0).selectedIndex;
        if (x != 0) {
            this.theDepartmentUser = this.departmentUsers[x - 1];
            this.selectedDepartmentUserList.push(this.theDepartmentUser);
            this.selectedDepartmentUserIdList.push(this.theDepartmentUser.userid);
        }
    }
    removePeople(user, userid) {
        const index = this.selectedDepartmentUserList.indexOf(user);
        const indexId = this.selectedDepartmentUserList.indexOf(userid);
        if (index > -1) {
            this.selectedDepartmentUserList.splice(index, 1)
        }
        if (indexId > -1) {
            this.selectedDepartmentUserList.splice(indexId, 1)
        }
    }
    save() {
        if(this.checked.length==0){
            alert('请选择模块!');
            return
        }
        if(!this.authority.roleId){
            alert('请选择角色!');
            return
        }
        if(!this.authority.permissionType){
            alert('请选择权限!');
            return
        }
        if(!this.isSelectedPeople){
            alert('请添加人员!');
            return
        }
        if(!this.departmentId){
            alert('请选择部门!');
            return
        }
        if(this.selectedDepartmentUserList.length==0){
            alert('请选择部门人员!');
            return
        }
        if(!this.authority.approvePermissionValue){
            alert('请选择类型!');
            return
        }
        if((this.authority.permissionType!=7&&this.authority.approvePermissionValue!=21)&&!this.authority.brandRange){
            alert('请选择范围!');
            return
        }
        this.authority.businessModuleIds = this.checked;
        this.isSaving = true;
        this.authority.dingPersonIds = this.selectedDepartmentUserIdList;
        console.log(this.authority);
        if(this.authority.approvePermissionValue==21||this.authority.permissionType==7){
            this.authority.brandRange=null;
        }
            this.authorityService.createPermissons(this.authority).subscribe((response) =>this.onSaveSuccess(response), () => this.onSaveError());
    }
    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'authorityListInfo', content:'authorityListCreate'});
        this.isSaving = false;
        this.isSelectedPeople=false;
        this.activeModal.dismiss(result.body);
    }
    private onSaveError() {
        this.isSaving = false;
        this.isSelectedPeople=false;
    }
}
