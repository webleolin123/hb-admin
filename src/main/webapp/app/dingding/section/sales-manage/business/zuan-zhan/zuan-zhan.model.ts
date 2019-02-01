import {ApproverInfo} from "../../../base-data/default-approver/approver-info.model";
import {ApproveInfoDetail} from "../zhi-tong-che/approver-info-detail.model";
/**
 * Created by yl on 2018/5/17.
 */
export class ZuanZhan {
    public id ?: any;
    public approveInfoDTO ?: ApproverInfo;

    public approveInfoId ?: any;
    public newmark ?: any;
    public usedPrice ?: any;


    public endDate ?: any;
    public shopId ?: any;
    public brandId ?: any;
    public goodId ?: any;
    public isSupportedByFactory?: any;
    public perPrice?: any;
    public perPriceOfSupport ?: any;
    public priceType ?: any;
    public priceTypeOfSupport ?: any;
    public startDate ?: any;
    public status ?: any;
    public totalPrice ?: any;
    public zzType ?: any;

    public goodName ?: string;
    public shopName ?: string;
    public brandName ?: string;

    public approveInfoDetailDTO ?: ApproveInfoDetail;
    constructor(id ?: any,
                approveInfoDTO ?: ApproverInfo,
                approveInfoId ?: any,
                newmark ?: any,
                usedPrice ?: any,
                endDate ?: any,
                goodId ?: any,
                brandId ?: any,
                shopId ?: any,
                isSupportedByFactory?: any,
                perPrice?: any,
                perPriceOfSupport ?: any,
                priceType ?: any,
                priceTypeOfSupport ?: any,
                startDate ?: any,
                status ?: any,
                totalPrice ?: any,
                zzType ?: any,
                approveInfoDetailDTO ?: ApproveInfoDetail,
                shopName ?: string,
                brandName ?: string,
                goodName ?: string) {
        this.id = id ? id : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
        this.newmark = newmark ? newmark : null;
        this.usedPrice = usedPrice ? usedPrice : null;
        this.endDate = endDate ? endDate : null;
        this.goodId = goodId ? goodId : null;
        this.shopId = shopId ? shopId : null;
        this.brandId = brandId ? brandId : null;
        this.isSupportedByFactory = isSupportedByFactory ? isSupportedByFactory : null;
        this.perPrice = perPrice ? perPrice : null;
        this.perPriceOfSupport = perPriceOfSupport ? perPriceOfSupport : null;
        this.priceType = priceType ? priceType : null;
        this.priceTypeOfSupport = priceTypeOfSupport ? priceTypeOfSupport : null;
        this.startDate = startDate ? startDate : null;
        this.status = status ? status : null;
        this.totalPrice = totalPrice ? totalPrice : null;
        this.zzType = zzType ? zzType : null;
        this.approveInfoDetailDTO = approveInfoDetailDTO ? approveInfoDetailDTO : null;
        this.shopName = shopName ? shopName : null;
        this.brandName = brandName ? brandName : null;
        this.goodName = goodName ? goodName : null;
    }
}
