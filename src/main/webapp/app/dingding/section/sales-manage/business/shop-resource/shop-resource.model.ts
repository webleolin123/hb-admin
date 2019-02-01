/**
 * Created by yl on 2018/5/21.
 */
export class ShopReSource {
    public id ?: any;
    public logo?: string;
    public platformId?: any;
    public platformName ?: string;
    public preLink?: string;
    public shopName ?: string;
    public status ?: any;

    constructor(id ?: any,
                logo?: string,
                platformId?: any,
                platformName ?: string,
                preLink?: string,
                shopName ?: string,
                status ?: any) {
        this.id = id ? id : null;
        this.logo = logo ? logo : null;
        this.platformId = platformId ? platformId : null;
        this.platformName = platformName ? platformName : null;
        this.preLink = preLink ? preLink : null;
        this.shopName = shopName ? shopName : null;
        this.status = status ? status : null;
    }
}
