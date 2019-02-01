/**
 * Created by Administrator on 2018/7/25.
 */
export class Sale {
    public id ?: any;
    public goodsId ?: string; //商品ID
    public shopName ?: string; //店铺
    public goodsName ?: string; //商品名称
    public brandName ?: string; //商品sku
    public status ?: any; //原因
    constructor(id ?: any,
                goodsId ?: string,
                shopName ?: string,
                goodsName ?: string,
                brandName ?: string,
                status ?: any) {
        this.id = id ? id : null;
        this.goodsId = goodsId ? goodsId : null;
        this.shopName = shopName ? shopName : null;
        this.goodsName = goodsName ? goodsName : null;
        this.brandName = brandName ? brandName : null;
        this.status = status ? status : null;
    }
}
