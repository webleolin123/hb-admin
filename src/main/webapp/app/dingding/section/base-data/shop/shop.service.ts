import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Shop} from './shop.model';
import {Brand} from './brand.model';
import {Good} from '../good/good.model'
import {createRequestOption} from '../../../../shared/model/request-util';
import {WORKFLOW_SHOP_API, WORKFLOW_SHOP_SEARCH_API, WORKFLOW_BRAND_API,WORKFLOW_FIND_GOOD_BY_SHOP_AND_BRAND_API} from '../../../../app.constants';
@Injectable()
export class ShopService {
    shopId: any;
    private resourceUrl = WORKFLOW_SHOP_API;
    private searchUrl = WORKFLOW_SHOP_SEARCH_API;
    public shopResourceUrl = WORKFLOW_SHOP_API;
    public brandResourceUrl = WORKFLOW_BRAND_API;
    public findGoodByShopUrl = WORKFLOW_FIND_GOOD_BY_SHOP_AND_BRAND_API;
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Shop[]>> {
        const options = createRequestOption(req);
        return this.http.get<Shop[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<Shop>> {
        return this.http.get<Shop>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    update(shop: Shop): Observable<HttpResponse<Shop>> {
        return this.http.put<Shop>(this.resourceUrl, shop, {observe: 'response'});
    }
    create(shop: Shop): Observable<HttpResponse<Shop>> {
        return this.http.post<Shop>(this.resourceUrl, shop, {observe: 'response'});
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    queryShop(req?: any): Observable<HttpResponse<Shop[]>> {
        const options = createRequestOption(req);
        return this.http.get<Shop[]>(this.shopResourceUrl, {params: options, observe: 'response'});
    }
    queryBrand(req?: any): Observable<HttpResponse<Brand[]>> {
        const options = createRequestOption(req);
        return this.http.get<Brand[]>(this.brandResourceUrl, {params: options, observe: 'response'});
    }
    queryShopGood(req?: any): Observable<HttpResponse<Good[]>> {
        const options = createRequestOption(req);
        return this.http.get<Good[]>(this.findGoodByShopUrl, {params: options, observe: 'response'});
    }
    queryByShopIdAndBrandId(req?: any): Observable<HttpResponse<Good[]>> {
        const options = createRequestOption(req);
        return this.http.get<Good[]>(this.findGoodByShopUrl, {
            params: options,
            observe: 'response'
        });
    }
}
