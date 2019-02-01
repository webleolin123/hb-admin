/**
 * Created by yl on 2018/4/17.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {GoodSku} from './good-sku.model';
import {createRequestOption} from '../../../../shared/model/request-util';
import {WORKFLOW_GOOD_SKU_API, WORKFLOW_GOOD_SKU_SEARCH_API} from '../../../../app.constants';

@Injectable()
export class GoodSkuService {
    goodSkuId: any;
    private resourceUrl = WORKFLOW_GOOD_SKU_API;
    private searchUrl = WORKFLOW_GOOD_SKU_SEARCH_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<GoodSku[]>> {
        const options = createRequestOption(req);
        return this.http.get<GoodSku[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<GoodSku>> {
        return this.http.get<GoodSku>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(goodSku: GoodSku): Observable<HttpResponse<GoodSku>> {
        return this.http.put<GoodSku>(this.resourceUrl, goodSku, {observe: 'response'});
    }

    create(goodSku: GoodSku): Observable<HttpResponse<GoodSku>> {
        return this.http.post<GoodSku>(this.resourceUrl, goodSku, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
