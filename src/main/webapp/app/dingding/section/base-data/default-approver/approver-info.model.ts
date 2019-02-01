/**
 * Created by yl on 2018/5/6.
 */

import {DingPerson} from './ding-person.model';
import {ActionProcess} from "../../sales-manage/business/zhi-tong-che/action-process.model";
export class ApproverInfo {
    public id ?: any;

    public actionProcess ?: ActionProcess[];

    public applicant ?: string;
    public applicantId ?: string;
    public applyReason ?: string;
    public approver ?: DingPerson[];
    public autoAddApproverAtFirstSeq ?: any;
    public autoAddApproverAtSecondSeq ?: any;
    public autoAddCopy ?: any;
    public businessId ?: any;
    public businessType ?: any;
    public moduleLinkUrl ?: string;
    public completeDate ?: string;
    public copyPeople ?: DingPerson[];
    public copyTo ?: DingPerson[];
    public createdDate ?: string;
    public dingPeople ?: DingPerson[];
    public firstApprovers ?: DingPerson[];
    public goodBakId ?: any;
    public moduleId ?: any;
    public searchKey ?: string;
    public secondApprovers ?: DingPerson[];
    public seqLevel ?: any;
    public status ?: any;
    public title ?: string;

    public goodId ?: any;
    public shopId ?: any;
    public brandId ?: any;
    public shopName ?: string;
    public brandName ?: string;
    public goodName ?: string;
    public goodBakGoodId ?: string;
    public goodGoodId ?: string;

    constructor(id ?: any,
                applicant?: string,
                applicantId?: string,
                applyReason ?: string,
                approver?: DingPerson[],
                autoAddApproverAtFirstSeq ?: any,
                autoAddApproverAtSecondSeq ?: any,
                autoAddCopy ?: any,
                businessId ?: any,
                businessType ?: any,
                moduleLinkUrl ?: string,
                completeDate ?: any,
                copyPeople?: DingPerson[],
                copyTo?: DingPerson[],
                createdDate ?: string,
                dingPeople?: DingPerson[],
                firstApprovers ?: DingPerson[],
                goodBakId ?: any,
                goodId ?: any,
                moduleId ?: any,
                searchKey ?: string,
                secondApprovers ?: DingPerson[],
                seqLevel ?: any,
                shopId ?: any,
                brandId ?: any,
                status ?: any,
                title ?: string,
                shopName ?: string,
                brandName ?: string,
                goodName ?: string,
                goodBakGoodId ?: string,
                goodGoodId ?: string) {
        this.id = id ? id : null;
        this.applicant = applicant ? applicant : null;
        this.applicantId = applicantId ? applicantId : null;
        this.applyReason = applyReason ? applyReason : null;
        this.approver = approver ? approver : null;
        this.autoAddApproverAtFirstSeq = autoAddApproverAtFirstSeq ? autoAddApproverAtFirstSeq : null;
        this.autoAddApproverAtSecondSeq = autoAddApproverAtSecondSeq ? autoAddApproverAtSecondSeq : null;
        this.autoAddCopy = autoAddCopy ? autoAddCopy : null;
        this.businessId = businessId ? businessId : null;
        this.businessType = businessType ? businessType : null;
        this.moduleLinkUrl = moduleLinkUrl ? moduleLinkUrl : null;
        this.completeDate = completeDate ? completeDate : null;
        this.copyPeople = copyPeople ? copyPeople : null;
        this.copyTo = copyTo ? copyTo : null;
        this.createdDate = createdDate ? createdDate : null;
        this.dingPeople = dingPeople ? dingPeople : null;
        this.firstApprovers = firstApprovers ? firstApprovers : null;
        this.goodBakId = goodBakId ? goodBakId : null;
        this.goodId = goodId ? goodId : null;
        this.moduleId = moduleId ? moduleId : null;
        this.searchKey = searchKey ? searchKey : null;
        this.secondApprovers = secondApprovers ? secondApprovers : null;
        this.seqLevel = seqLevel ? seqLevel : null;
        this.shopId = shopId ? shopId : null;
        this.brandId = brandId ? brandId : null;
        this.status = status ? status : null;
        this.title = title ? title : null;
        this.shopName = shopName ? shopName : null;
        this.brandName = brandName ? brandName : null;
        this.goodName = goodName ? goodName : null;
        this.goodBakGoodId = goodBakGoodId ? goodBakGoodId : null;
        this.goodGoodId = goodGoodId ? goodGoodId : null;
    }
}
