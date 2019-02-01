export class DingPerson {
    public id ?: any;
    public dingId ?: string;
    public dingName ?: string;
    public type ?: any; // APPLY("我申请的", 1),APPROVE("待我审批", 2),COPYTO("抄送给我", 3);
    public isDefaultActor ?: any; // 是否为默认审批人; 0:否  1：是
    constructor(id ?: any,
                dingId ?: string,
                dingName ?: string,
                type ?: any,
                isDefaultActor ?: any) {
        this.id = id ? id : null;
        this.dingId = dingId ? dingId : null;
        this.dingName = dingName ? dingName : null;
        this.type = type ? type : null;
        this.isDefaultActor = isDefaultActor ? isDefaultActor : 0;
    }
}
