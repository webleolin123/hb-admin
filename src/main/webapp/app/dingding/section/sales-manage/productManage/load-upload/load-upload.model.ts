/**
 * Created by yl on 2018/4/18.
 */
import {ApproverInfo} from '../approver-info.model';
export class Shelves {
    public id ?: any;
    public applyType ?: number;
    public onShelfTime ?: string;
    public approveInfoId ?: number;
    public approveInfoDTO ?: ApproverInfo;
    constructor(
                id ?: any,
                applyType ?: number,
                onShelfTime ?: string,
                approveInfoDTO ?: ApproverInfo,
                approveInfoId ?: any,
                ) {
        this.id = id ? id : null;
        this.applyType = applyType ? applyType : null;
        this.onShelfTime = onShelfTime ? onShelfTime : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
    }
}
