/**
 * Created by yl on 2018/5/21.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {TaoKe} from './tao-ke.model';
import {createRequestOption} from '../../../../../shared/model/request-util';
import {WORKFLOW_TAO_KE_API, WORKFLOW_TAO_KE_DETAIL_API, WORKFLOW_TAO_KE_EXPORT_API} from '../../../../../app.constants';

@Injectable()
export class TaoKeService {
    taoKeId: any;
    private resourceUrl = WORKFLOW_TAO_KE_API;
    private checkDetailUrl = WORKFLOW_TAO_KE_DETAIL_API;
    private exportDataByTimeBetweenUrl = WORKFLOW_TAO_KE_EXPORT_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<TaoKe[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaoKe[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    exportDataByTimeBetween(req?: any): Observable<HttpResponse<TaoKe[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaoKe[]>(this.exportDataByTimeBetweenUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<TaoKe>> {
        return this.http.get<TaoKe>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(taoKe: TaoKe): Observable<HttpResponse<TaoKe>> {
        return this.http.put<TaoKe>(this.resourceUrl, taoKe, {observe: 'response'});
    }

    create(taoKe: TaoKe): Observable<HttpResponse<TaoKe>> {
        return this.http.post<TaoKe>(this.resourceUrl, taoKe, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    checkDetail(req?: any): Observable<HttpResponse<TaoKe>> {
        const options = createRequestOption(req);
        return this.http.get<TaoKe>(this.checkDetailUrl, {
            params: options,
            observe: 'response'
        });
    }
}
