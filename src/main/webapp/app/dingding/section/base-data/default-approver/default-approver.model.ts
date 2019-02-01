/**
 * Created by yl on 2018/4/18.
 */
import {DingPerson} from './ding-person.model';
export class DefaultApprover {
    public id ?: any;
    public approver ?: DingPerson[];
    public businessType ?: any;
    public copyTo ?: DingPerson[];

    constructor(id ?: any,
                approver ?: DingPerson[],
                businessType ?: any,
                copyTo ?: DingPerson[]) {
        this.id = id ? id : null;
        this.approver = approver ? approver : null;
        this.businessType = businessType ? businessType : null;
        this.copyTo = copyTo ? copyTo : null;
    }
}
