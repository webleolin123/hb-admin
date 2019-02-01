/**
 * Created by yl on 2018/4/18.
 */
import {ApproverInfo} from '../approver-info.model';
import {ApproveInfoDetail} from "../approver-info-detail.model";
export class Price {
    public id ?: any;
    public applyType ?: number;
    public approveInfoId ?: number;
    public approveInfoDTO ?: ApproverInfo;
    constructor(
                id ?: any,
                applyType ?: number,
                approveInfoDTO ?: ApproverInfo,
                approveInfoId ?: any,
                ) {
        this.id = id ? id : null;
        this.applyType = applyType ? applyType : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
    }
}
