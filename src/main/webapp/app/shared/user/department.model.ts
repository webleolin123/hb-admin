/**
 * Created by Administrator on 2018/8/3.
 */
export class Department {
    public id ?: any;
    public autoAddUser ?: any;
    public createDeptGroup ?: any;
    public name ?: string;
    public parentid ?: any;

    constructor(
                id ?: any,
                autoAddUser ?: any,
                createDeptGroup ?: any,
                name?: string,
                parentid?: any,) {
        this.id = id ? id : null;
        this.autoAddUser = autoAddUser ? autoAddUser : null;
        this.createDeptGroup = createDeptGroup ? createDeptGroup : null;
        this.name = name ? name : null;
        this.parentid = parentid ? parentid : null;
    }
}
