import {DingPerson} from './ding-person.model';
import {ActionProcess} from './action-process.model';
import {Data} from "./data.model";
import {Department} from "./department.model";
import {RolesInfo} from "./roles.model";
export class ApproverInfo {
    public id ?: any;
    public applicant?: string;
    public applicantId?: string;
    public applyReason ?: string;
    public approver?: DingPerson[];
    public businessId ?: any;
    public endTime ?: any;
    public startTime ?: any;
//导出数据相关
    public businessType ?: any;
    public copyTo?: DingPerson[];
    public copyPeople?: DingPerson[];
    public firstApprovers?: DingPerson[];
    public createdDate ?: string;
    public status ?: any;
    public data ?: Data;
//导出数据相关
    public actionProcess ?: ActionProcess;
    public searchKey ?: string;
    public title ?: string;
//综合管理-- 工资条--考勤
    public month ?: string;
    public keyCode ?: string;
    public bankName ?: string;
    public bankCode ?: string;
    public createDate ?: string;
    public department ?: string;
    public sendMessageStatus  ?: any;
// 推广管理相关
    public goodsId ?: string; //商品ID
    public shopName ?: string; //店铺
    public goodsName ?: string; //商品名称
    public brandName ?: string; //商品sku
    public approveInfoDTO ?: ApproverInfo;
    public approveInfoId ?: any;
    public newmark ?: any;
    public usedPrice ?: any;  // 实际使用金额
    public endDate ?: any;
    public shopId ?: any;
    public brandId ?: any;
    public goodId ?: any;
    public isSupportedByFactory ?: any;
    public perPrice ?: any;
    public perPriceOfSupport ?: any;
    public priceType ?: any;
    public priceTypeOfSupport ?: any;
    public startDate ?: any;
    public totalPrice ?: any;
    public goodName ?: string;
//部门管理相关
    public departmentDTO ?: Department;
//角色管理相关
    public rolesDTO ?: RolesInfo;
//人员管理相关
    public active ?: boolean;
    public roles ?: string;
    public position ?: string;
    public userid ?: string;
    public name ?: string;
    public mobile ?: string;
    public email ?: string;
//促销管理
    public reducePrice?: any;
    public breakingPrice?: any;
    public limitPrice?: any;
    public applyType?: any;
    constructor(id ?: any,
                reducePrice?:any,
                breakingPrice?:any,
                limitPrice?:any,
                applyType?:any,
                applicant?: string,
                applicantId?: string,
                applyReason ?: string,
                approver?: DingPerson[],
                firstApprovers?: DingPerson[],
                businessId ?: any,
                businessType ?: any,
                copyTo?: DingPerson[],
                copyPeople?: DingPerson[],
                createdDate ?: string,
                startTime ?: string,
                endTime ?: string,
                status ?: any,
                searchKey ?: string,
                title ?: string,
                actionProcess ?: ActionProcess,
//综合管理-- 工资条--考勤
                month ?: string,
                keyCode ?: string,
                bankCode ?: string,
                bankName ?: string,
                createDate ?: string,
                department ?: string,
                sendMessageStatus ?: any,
// 推广管理相关
                goodsId ?: string, //商品ID
                shopName ?: string, //店铺
                goodsName ?: string, //商品名称
                brandName ?: string, //商品sku
                approveInfoDTO ?: ApproverInfo,
                approveInfoId ?: any,
                newmark ?: any,
                usedPrice ?: any,  // 实际使用金额
                endDate ?: any,
                shopId ?: any,
                brandId ?: any,
                goodId ?: any,
                isSupportedByFactory ?: any,
                perPrice ?: any,
                perPriceOfSupport ?: any,
                priceType ?: any,
                priceTypeOfSupport ?: any,
                startDate ?: any,
                totalPrice ?: any,
                goodName ?: string,
//部门管理相关
                departmentDTO ?: Department,
//角色管理相关
                rolesDTO ?: RolesInfo,
//人员管理相关
                active ?: boolean,
                roles ?: string,
                position ?: string,
                userid ?: string,
                name ?: string,
                mobile ?: string,
                email ?: string,
    ) {
// 推广管理相关
        this.reducePrice = reducePrice ? reducePrice : null;
        this.breakingPrice = breakingPrice ? breakingPrice : null;
        this.limitPrice = limitPrice ? limitPrice : null;
        this.applyType = applyType ? applyType : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
        this.newmark = newmark ? newmark : null;
        this.usedPrice = usedPrice ? usedPrice : null;
        this.endDate = endDate ? endDate : null;
        this.shopId = shopId ? shopId : null;
        this.brandId = brandId ? brandId : null;
        this.goodId = goodId ? goodId : null;
        this.isSupportedByFactory = isSupportedByFactory ? isSupportedByFactory : null;
        this.perPrice = perPrice ? perPrice : null;
        this.perPriceOfSupport = perPriceOfSupport ? perPriceOfSupport : null;
        this.priceType = priceType ? priceType : null;
        this.priceTypeOfSupport = priceTypeOfSupport ? priceTypeOfSupport : null;
        this.startDate = startDate ? startDate : null;
        this.endTime = endTime ? endTime : null;
        this.startTime = startTime ? startTime : null;
        this.totalPrice = totalPrice ? totalPrice : null;
        this.goodName = goodName ? goodName : null;
        this.shopName = shopName ? shopName : null;
        this.goodsName = goodsName ? goodsName: null;
        this.brandName = brandName ? brandName : null;
//初始
        this.id = id ? id : null;
        this.applicant = applicant ? applicant : null;
        this.applicantId = applicantId ? applicantId : null;
        this.applyReason = applyReason ? applyReason : null;
        this.approver = approver ? approver : null;
        this.businessId = businessId ? businessId : null;
        this.businessType = businessType ? businessType : null;
        this.copyTo = copyTo ? copyTo : null;
        this.copyPeople = copyPeople ? copyPeople : null;
        this.firstApprovers = firstApprovers ? firstApprovers : null;
        this.createdDate = createdDate ? createdDate : null;
        this.status = status ? status : null;
        this.searchKey = searchKey ? searchKey : null;
        this.title = title ? title : null;
        this.actionProcess = actionProcess ? actionProcess : null;
//综合管理--工资条、考勤
        this.month = month ? month : null;
        this.keyCode = keyCode ? keyCode : null;
        this.bankName = bankName ? bankName : null;
        this.bankCode = bankCode ? bankCode : null;
        this.createDate = createDate ? createDate : null;
        this.department = department ? department : null;
        this.sendMessageStatus = sendMessageStatus ? sendMessageStatus : null;
//部门管理相关
        this.departmentDTO = departmentDTO ? departmentDTO : null;
//角色管理相关
        this.rolesDTO = rolesDTO ? rolesDTO : null;
//人员管理相关
        this.active = active ? active : null;
        this.roles = roles ? roles : null;
        this.position = position ? position : null;
        this.userid = userid ? userid : null;
        this.name = name ? name : null;
        this.mobile = mobile ? mobile : null;
        this.email = email ? email : null;
    }
}
