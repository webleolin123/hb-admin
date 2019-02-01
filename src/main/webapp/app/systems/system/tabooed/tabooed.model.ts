/**
 * Created by yl on 2018/1/10.
 */
export class Tabooed {
    public id ?: any;
    public create_user ?: string; // 内容
    public created_time  ?: any;
    public name  ?: string;

    constructor(id ?: any,
                create_user ?: string,
                created_time  ?: any,
                name  ?: string,) {
        this.id = id ? id : null;
        this.create_user = create_user ? create_user : null;
        this.created_time = created_time ? created_time : null;
        this.name = name ? name : null;
    }
}
