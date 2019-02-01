/**
 * Created by Administrator on 2018/7/25.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Sale} from './sales-manage.model';
import {createRequestOption} from '../../../../../shared/model/request-util';
// import {WORKFLOW_sale_API, WORKFLOW_sale_SEARCH_API} from '../../../app.constants';
@Injectable()
export class SaleService{
    saleId: any;
    private resourceUrl = '';
    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Sale[]>> {
        const options = createRequestOption(req);
        return this.http.get<Sale[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Sale>> {
        return this.http.get<Sale>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(sale: Sale): Observable<HttpResponse<Sale>> {
        return this.http.put<Sale>(this.resourceUrl, sale, {observe: 'response'});
    }

    create(sale: Sale): Observable<HttpResponse<Sale>> {
        return this.http.post<Sale>(this.resourceUrl, sale, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
