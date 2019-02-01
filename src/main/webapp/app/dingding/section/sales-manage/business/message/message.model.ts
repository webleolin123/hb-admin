import {ApproverInfo} from "../../../base-data/default-approver/approver-info.model";
import {ApproveInfoDetail} from "../zhi-tong-che/approver-info-detail.model";
/**
 * Created by yl on 2018/5/17.
 */
export class Message {
    public id ?: any;
    public approveInfoDTO ?: ApproverInfo;
    public approveInfoId?: any;
    public endDate ?: any;
    public shopId ?: any;
    public brandId ?: any;
    public goodId ?: any;
    public pushCause?: any;
    public pushNumber ?: any;
    public smsContent ?: string;
    public smsType?: any;
    public startDate ?: any;
    public status ?: any;
    // public approveInfoDetailDTO ?: ApproveInfoDetail;

    public shopName ?: string;
    public brandName ?: string;
    public goodName ?: string;

    constructor(id ?: any,
                approveInfoDTO ?: ApproverInfo,
                approveInfoId?: any,
                endDate ?: any,
                shopId ?: any,
                brandId ?: any,
                goodId ?: any,
                pushCause ?: any,
                pushNumber ?: any,
                smsContent ?: string,
                startDate ?: any,
                status ?: any,
                smsType ?: any,
                // approveInfoDetailDTO ?: ApproveInfoDetail,
                shopName ?: string,
                brandName ?: string,
                goodName ?: string) {
        this.id = id ? id : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
        this.endDate = endDate ? endDate : null;
        this.goodId = goodId ? goodId : null;
        this.brandId = brandId ? brandId : null;
        this.shopId = shopId ? shopId : null;
        this.pushCause = pushCause ? pushCause : null;
        this.pushNumber = pushNumber ? pushNumber : null;
        this.smsContent = smsContent ? smsContent : null;
        this.smsType = smsType ? smsType : null;
        this.startDate = startDate ? startDate : null;
        this.status = status ? status : null;
        // this.approveInfoDetailDTO = approveInfoDetailDTO ? approveInfoDetailDTO : null;
        this.shopName = shopName ? shopName : null;
        this.brandName = brandName ? brandName : null;
        this.goodName = goodName ? goodName : null;
    }
}
