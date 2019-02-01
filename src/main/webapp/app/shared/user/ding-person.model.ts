/**
 * Created by Administrator on 2018/8/3.
 */
export class DingPerson {
    public active ?: any;
    public name ?: string;
    public userid ?: string;

    constructor(
                active ?: any,
                name?: string,
                userid?: string,) {
        this.active = active ? active : null;
        this.name = name ? name : null;
        this.userid = userid ? userid : null;
    }
}
