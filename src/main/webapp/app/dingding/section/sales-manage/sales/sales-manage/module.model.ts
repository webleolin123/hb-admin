/**
 * Created by Administrator on 2018/7/25.
 */
export class Module {
    public id ?: any;
    public module ?: string; //商品ID
    public applyTime ?: string; //店铺
    public applicant ?: string; //商品名称
    public status ?: any; //原因
    constructor(id ?: any,
                module ?: string,
                applyTime ?: string,
                applicant ?: string,
                status ?: any) {
        this.id = id ? id : null;
        this.module = module ? module : null;
        this.applyTime = applyTime ? applyTime : null;
        this.applicant = applicant ? applicant : null;
        this.status = status ? status : null;
    }
}
