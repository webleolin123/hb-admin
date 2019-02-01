/**
 * Created by Administrator on 2018/8/16.
 */
export class EnterpriseInfo {
    public agentid ?: any;
    public corpId ?: any;
    public signature ?: any;
    public nonceStr ?: any;
    public timestamp ?: any;

    constructor(agentid ?: any,
                corpId ?: any,
                signature ?: any,
                nonceStr ?: any,
                timestamp ?: any,) {
        this.agentid = agentid ? agentid : null;
        this.corpId = corpId ? corpId : null;
        this.signature = signature ? signature : null;
        this.nonceStr = nonceStr ? nonceStr : null;
        this.timestamp = timestamp ? timestamp : null;

    }
}
