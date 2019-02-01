export class RolesPeople {
    public id ?: any;
    public dingName ?: string;
    public dingId ?: string;
    public avatar ?: string;
    public type ?: number;
    public isDefaultActor ?: number;
    public departmentId ?: any;
    public department ?: any;

    constructor(
        id ?: any,
        dingName ?: string,
        dingId ?: string,
        avatar ?: string,
        type ?: number,
        isDefaultActor ?: number,
        departmentId ?: any,
        department ?: any,
        ) {
        this.id = id ? id : null;
        this.dingName = dingName ? dingName : null;
        this.dingId = dingId ? dingId : null;
        this.avatar = avatar ? avatar : null;
        this.type = type ? type : null;
        this.isDefaultActor = isDefaultActor ? isDefaultActor : null;
        this.departmentId = departmentId ? departmentId : null;
        this.department = department ? department : null;
    }
}
