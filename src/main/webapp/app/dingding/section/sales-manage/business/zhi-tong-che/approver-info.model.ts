/**
 * Created by yl on 2018/5/6.
 */

import {DingPerson} from '../../../base-data/default-approver/ding-person.model';

export class ApproverInfo {
    public id ?: any;
    public applicant?: string;
    public applicantId?: string;
    public applyReason ?: string;
    public approver?: DingPerson[];
    public businessId ?: any;
    public businessType ?: any;
    public copyTo?: DingPerson[];
    public createdDate ?: string;
    public status ?: any;

    public searchKey ?: string;
    public title ?: string;
    constructor(id ?: any,
                applicant?: string,
                applicantId?: string,
                applyReason ?: string,
                approver?: DingPerson[],
                businessId ?: any,
                businessType ?: any,
                copyTo?: DingPerson[],
                createdDate ?: string,
                status ?: any,
                searchKey ?: string,
                title ?: string,
    ) {
        this.id = id ? id : null;
        this.applicant = applicant ? applicant : null;
        this.applicantId = applicantId ? applicantId : null;
        this.applyReason = applyReason ? applyReason : null;
        this.approver = approver ? approver : null;
        this.businessId = businessId ? businessId : null;
        this.businessType = businessType ? businessType : null;
        this.copyTo = copyTo ? copyTo : null;
        this.createdDate = createdDate ? createdDate : null;
        this.status = status ? status : null;
        this.searchKey = searchKey ? searchKey : null;
        this.title = title ? title : null;
    }
}
