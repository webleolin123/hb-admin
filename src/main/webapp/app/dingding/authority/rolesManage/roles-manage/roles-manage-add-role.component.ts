import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService,JhiEventManager} from "ng-jhipster";
import {ApproverCommonInfo} from '../../../../common/http/approve-common.model';
import {MyHttpService} from '../../../../common/http/myHttp.service';
import {Department} from "../../../../shared/user/department.model";
import {DingPerson} from "../../../../shared/user/ding-person.model";
import {UserService} from "../../../../core/user/user.service";
import {
    WORKFLOW_DINGDING_PERMISSION_ROLES_API,
    WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_ADD_API,
    WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_REMOVE_API,
    WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_API,
    WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_BY_PERSON_API,
} from '../../../../app.constants';
@Component({
  selector: 'role-add',
  templateUrl: './roles-manage-add-role.component.html',
  styles: []
})
export class RolesManageAddRoleComponent implements OnInit,OnDestroy {
    @Input() personnel_dingId:any=null;//人员id
    @Input() isAdd:boolean;//是否是添加操作
    title:any;//显示对应模块title
    roleId:any=null;//角色id
    person_roleId:any=null;//人员管理-添加角色时要传角色id
    departments: Department[];
    departmentId: any;
    dingId:any;
    departmentUsers: DingPerson[];
    roleLevel:any;//角色等级
    roleName:any;//角色名称
    roleType:any;//角色类型
    roleInfo: ApproverCommonInfo;
    roles:any=[];//对象容器
    isSaving:boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private roleAddService: MyHttpService,
        private eventManager: JhiEventManager,
        private alertService: JhiAlertService,
        private userService: UserService,
    ) {
    }
    ngOnInit() {
        this.isSaving = false;
        if(this.personnel_dingId){//人员管理--添加角色,移除角色
            this.roles=[];
            this.person_roleId=0;
            if(this.isAdd){//添加角色
                this.title='添加角色';
                this.roleAddService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_API;
                this.roleAddService.query().subscribe((res) => {
                    this.roles = res.body;
                })
            }
            else{//移除角色
                this.title='移除角色';
                this.roleAddService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_BY_PERSON_API;
                this.roleAddService.query({
                    userid:this.personnel_dingId,
                }).subscribe((res) => {
                    this.roles = res.body;
                })
            }
        }
        else{
            this.roleInfo = new ApproverCommonInfo;
            this.roleId=this.roleAddService.approverCommonId;
            if(!this.roleId){
                this.title='添加角色';
                this.roleAddService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_ROLES_API;
            }
            else{
                this.title='添加人员';
                this.loadDepartment();
            }
        }
    }
    ngOnDestroy() {
        this.personnel_dingId=null;
        this.roleId=null;
    }
    loadDepartment() {
        this.userService.getDepartmentList().subscribe((res) => {
            this.departments = res.body;
        })
    }
    selectedDepartment() {
        this.loadDepartmentUser();
    }
    loadDepartmentUser(){
        if (this.departmentId) {
            this.userService.getDepartmentUser({
                departmentId: this.departmentId
            }).subscribe((res) => {
                this.departmentUsers = res.body;
            });
        }
    }
    save() {
        if(this.personnel_dingId){
            if(!this.person_roleId){
                alert('请选择角色名称');
                return
            }
            this.isSaving=true;
            if(this.isAdd){
                this.roleAddService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_ADD_API;
            }
            else{
                this.roleAddService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_REMOVE_API;
            }
            this.roleAddService.add({
                roleId:Number(this.person_roleId),
                dingId:this.personnel_dingId,
            }).subscribe((response) => this.onSaveSuccess(response),
                (res: Response) => this.onError(res.json()));
        }
        else{
            if(!this.roleId){
                if(!this.roleName){
                    alert('请填写角色名称');
                    return
                }
                this.isSaving=true;
                this.roleInfo.roleName=this.roleName;
                this.roleInfo.roleType=this.roleType;
                this.roleInfo.level=this.roleLevel;
                this.roleAddService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_ROLES_API;
                this.roleAddService.create(this.roleInfo).subscribe(
                    (response) => {
                        this.onSaveSuccess(response);
                    },
                    (res: Response) => this.onError(res.json())
                );
            }
            else{
                if(!this.departmentId){
                    alert('请选择部门');
                    return;
                }
                if(this.departmentId&&!this.dingId){
                    console.log('this.dingId',this.dingId);
                    alert('请选择人员');
                    return;
                }
                this.isSaving=true;
                this.roleAddService.resourceUrl=WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_ADD_API;
                this.roleAddService.add({
                    roleId:Number(this.roleId),
                    dingId:this.dingId,
                }).subscribe((response) => this.onSaveSuccess(response),
                    (res: Response) => this.onError(res.json()));
            }
        }
    }
    clear() {
        this.activeModal.dismiss('cancle');
    }
    private onSaveSuccess(res) {
        console.log('res',res);
        if(res.status==202){//重复添加情况
            if(this.personnel_dingId){//人员管理添加角色
                alert('当前人员已有该角色,请勿重复添加!');
            }
            else{//角色管理添加角色
                alert('所选角色已存在,请勿重复添加!');
            }
            this.isSaving = false;
            return;
        }
        if(res.status==201){
            if(!this.personnel_dingId){
                this.eventManager.broadcast({name: 'role_person_AddInfo', content: res.status});
            }
            this.isSaving = false;
            this.activeModal.dismiss(true);
        }
        if(res.status==200){//正常添加情况
            if(this.isAdd){//人员管理添加角色
                this.eventManager.broadcast({name: 'role_person_AddInfo', content: res.status});
            }
            else{
                if(this.personnel_dingId){//人员管理移除角色
                    this.eventManager.broadcast({name: 'role_person_RemoveInfo', content: res.status});
                }
                else{//角色管理添加角色或添加人员
                    this.eventManager.broadcast({name: 'role_person_AddInfo', content: res.status});
                }
            }
            this.isSaving = false;
            this.activeModal.dismiss(true);
        }
    }
    private onError(error) {
        this.isSaving = false;
        this.alertService.error(error.error, error.message, null);
    }
}
