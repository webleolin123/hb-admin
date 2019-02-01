/**
 * Created by yl on 2018/4/17.
 */
export class Brand {
    public id ?: any;
    public brandName ?: string;
    public logo ?: string;
    public status ?: any;
    public isSelected ?: any;

    constructor(id ?: any,
                brandName ?: string,
                logo ?: string,
                status ?: any,
                isSelected ?: any) {
        this.id = id ? id : null;
        this.brandName = brandName ? brandName : null;
        this.logo = logo ? logo : null;
        this.status = status ? status : null;
        this.isSelected = isSelected ? isSelected : 0;
    }
}
