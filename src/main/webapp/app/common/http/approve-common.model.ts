import {ViewDataInfo} from '../chart/chart.model';
import {ApproverInfo} from './approver-info.model';
import {HomeInfo} from './home-model/home.model';
export class ApproverCommonInfo {
    public id ?: any;
    public approveInfoDTO ?: ApproverInfo;
    public approveInfoId ?: any;
    public newmark ?: any;
    public usedPrice ?: any;  // 实际使用金额
    public endDate ?: any;
    public endTime ?: any;
    public startTime ?: any;
    public shopId ?: any;
    public brandId ?: any;
    public goodId ?: any;
    public isSupportedByFactory ?: any;
    public perPrice ?: any;
    public perPriceOfSupport ?: any;
    public priceType ?: any;
    public priceTypeOfSupport ?: any;
    public startDate ?: any;
    public status ?: any; //  状态
    public totalPrice ?: any;
    public shopName ?: string;
    public brandName ?: string;
    public goodName ?: string;
    public onShelfTime ?: string;
    public createdDate ?: any;
    public roleId ?: any;
    public roleName ?: any;
    public roleType?: any;
    public level?: any;
    public dingId?: any;
    public reducePrice?: any;
    public breakingPrice?: any;
    public limitPrice?: any;
    public applyType?: any;
    public homoeDTO?: HomeInfo;
    public viewDataInfo?: ViewDataInfo;
    public money?: any;
    //地址栏参数 临时
    public title?: any;
    public titleEN?: any;
    public url?: any;
    public requiredReq?: any;
    public flag?: any;//临时变量添加做判断比如做是否显示的标志位时
    //短信
    public pushCause?: any;
    public pushNumber ?: any;
    public smsContent ?: string;
    public smsType?: any;
    //短信
//售后登记
    public taoBaoId?: any;
    public orderId?: any;
    public telephone?: number;
    public problemType?: number;
    public helpType?: number;
    public problemInstruction?: string;
    public remarks?: string;
    public treatment?: string;
    public actionType?: number;
    public list?: any;
    public image?: any;
    public imageArr?: any;
    //兼容错漏发趋势图
    public all?: any;
    public not?: any;
    public already?: any;
    public adoptedApproveFee?: any;
    public adoptedNumber?: any;
    public cancelledNumber?: any;
    public processedNumber?: any;
    public toDoNumber?: any;
    public totalApplicantNumber?: any;
    public totalApproveFee?: any;
    public totalGoodNumber?: any;
    public totalNumber?: any;
    public usedApproveFee?: any;
    //库存调拨
    public applyDesc?: any;//申请内容
    //地图封装
    public position?:any;//经纬度数组
    public label?: any;//显示标签信息
    constructor(
                id ?: any,
                approveInfoDTO ?: ApproverInfo,
                approveInfoId ?: any,
                newmark ?: any,
                usedPrice ?: any,
                endDate ?: any,
                startTime ?: any,
                endTime ?: any,
                shopId ?: any,
                brandId ?: any,
                goodId ?: any,
                isSupportedByFactory ?: any,
                perPrice ?: any,
                perPriceOfSupport ?: any,
                priceType ?: any,
                priceTypeOfSupport ?: any,
                startDate ?: any,
                status ?: any,
                totalPrice ?: any,
                shopName ?: string,
                brandName ?: string,
                goodName ?: string,
                createdDate ?: any,
                onShelfTime ?: any,
                roleId ?: any,
                 roleName ?: any,
                 roleType?: any,
                 level?: any,
                dingId?: any,
                reducePrice?: any,
                breakingPrice?: any,
                limitPrice?: any,
                applyType?: any,
                homoeDTO?: HomeInfo,
                viewDataInfo?: ViewDataInfo,
                money?: any,
                title ?: any,
                titleEN ?: any,
                url ?: any,
                requiredReq ?: any,
                taoBaoId?: any,
                orderId?: any,
                telephone?: number,
                problemType?: number,
                helpType?: number,
                problemInstruction?: string,
                remarks?: string,
                treatment?: string,
                actionType?: number,
                list?: any,
                image?: any,
                imageArr?: any,
                //兼容错漏发趋势图
                all?: any,
                not?: any,
                already?: any,
                adoptedApproveFee?: any,
                adoptedNumber?: any,
                cancelledNumber?: any,
                processedNumber?: any,
                toDoNumber?: any,
                totalApplicantNumber?: any,
                totalApproveFee?: any,
                totalGoodNumber?: any,
                totalNumber?: any,
                usedApproveFee?: any,
                pushCause ?: any,
                pushNumber ?: any,
                smsContent ?: string,
                smsType ?: any,
                position ?: any,
                label ?: any,
                applyDesc ?: any,
                ) {
        this.id = id ? id : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
        this.newmark = newmark ? newmark : null;
        this.usedPrice = usedPrice ? usedPrice : null;
        this.endDate = endDate ? endDate : null;
        this.endTime = endTime ? endTime : null;
        this.startTime = startTime ? startTime : null;
        this.shopId = shopId ? shopId : null;
        this.brandId = brandId ? brandId : null;
        this.goodId = goodId ? goodId : null;
        this.isSupportedByFactory = isSupportedByFactory ? isSupportedByFactory : null;
        this.perPrice = perPrice ? perPrice : null;
        this.perPriceOfSupport = perPriceOfSupport ? perPriceOfSupport : null;
        this.priceType = priceType ? priceType : null;
        this.priceTypeOfSupport = priceTypeOfSupport ? priceTypeOfSupport : null;
        this.startDate = startDate ? startDate : null;
        this.status = status ? status : null;
        this.totalPrice = totalPrice ? totalPrice : null;
        this.totalPrice = totalPrice ? totalPrice : null;
        this.shopName = shopName ? shopName : null;
        this.brandName = brandName ? brandName : null;
        this.goodName = goodName ? goodName : null;
        this.createdDate = createdDate ? createdDate : null;
        this.onShelfTime = onShelfTime ? onShelfTime : null;
        this.roleName = roleName ? roleName : null;
        this.roleId = roleId ? roleId : null;
        this.roleType = roleType ? roleType : null;
        this.level = level ? level : null;
        this.dingId = dingId ? dingId : null;
        this.reducePrice = reducePrice ? reducePrice : null;
        this.breakingPrice = breakingPrice ? breakingPrice : null;
        this.limitPrice = limitPrice ? limitPrice : null;
        this.applyType = applyType ? applyType : null;
        this.homoeDTO = homoeDTO ? homoeDTO : null;
        this.viewDataInfo = viewDataInfo ? viewDataInfo : null;
        this.money = money ? money : null;
        this.title = title ? title : null;
        this.titleEN = titleEN ? titleEN : null;
        this.url = url ? url : null;
        this.requiredReq = requiredReq ? requiredReq : null;
        //售后登记
        this.taoBaoId = taoBaoId ? taoBaoId : null;
        this.orderId = orderId ? orderId : null;
        this.telephone = telephone ? telephone : null;
        this.problemType = problemType ? problemType : null;
        this.helpType = helpType ? helpType : null;
        this.problemInstruction = problemInstruction ? problemInstruction : null;
        this.remarks = remarks ? remarks : null;
        this.treatment = treatment ? treatment : null;
        this.actionType = actionType ? actionType : null;
        this.list = list ? list : null;
        this.image = image ? image : null;
        this.imageArr = imageArr ? imageArr : null;
        this.all = all ? all : null;
        this.not = not ? not : null;
        this.already = already ? already : null;
        this.adoptedApproveFee = adoptedApproveFee ? adoptedApproveFee : null;
        this.adoptedNumber = adoptedNumber ? adoptedNumber : null;
        this.cancelledNumber = cancelledNumber ? cancelledNumber : null;
        this.processedNumber = processedNumber ? processedNumber : null;
        this.toDoNumber = toDoNumber ? toDoNumber : null;
        this.totalApplicantNumber = totalApplicantNumber ? totalApplicantNumber : null;
        this.totalApproveFee = totalApproveFee ? totalApproveFee : null;
        this.totalGoodNumber = totalGoodNumber ? totalGoodNumber : null;
        this.totalNumber = totalNumber ? totalNumber : null;
        this.usedApproveFee = usedApproveFee ? usedApproveFee : null;
        this.pushCause = pushCause ? pushCause : null;
        this.pushNumber = pushNumber ? pushNumber : null;
        this.smsContent = smsContent ? smsContent : null;
        this.smsType = smsType ? smsType : null;
        this.position = position ? position : null;
        this.label = label ? label : null;
        //库存调拨
        this.applyDesc = applyDesc ? applyDesc : null;
    }
}
