/**
 * Created by Administrator on 2018/5/21.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {DaRen} from './da-ren.model';
import {createRequestOption} from '../../../../../shared/model/request-util';
import {WORKFLOW_DA_REN_API, WORKFLOW_DA_REN_DETAIL_API, WORKFLOW_DA_REN_EXPORT_API} from '../../../../../app.constants';

@Injectable()
export class DaRenService {

    daRenId: any;
    private resourceUrl = WORKFLOW_DA_REN_API;
    private checkDetailUrl = WORKFLOW_DA_REN_DETAIL_API;
    private exportDataByTimeBetweenUrl = WORKFLOW_DA_REN_EXPORT_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<DaRen[]>> {
        const options = createRequestOption(req);
        return this.http.get<DaRen[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    exportDataByTimeBetween(req?: any): Observable<HttpResponse<DaRen[]>> {
        const options = createRequestOption(req);
        return this.http.get<DaRen[]>(this.exportDataByTimeBetweenUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<DaRen>> {
        return this.http.get<DaRen>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(daRen: DaRen): Observable<HttpResponse<DaRen>> {
        return this.http.put<DaRen>(this.resourceUrl, daRen, {observe: 'response'});
    }

    create(daRen: DaRen): Observable<HttpResponse<DaRen>> {
        return this.http.post<DaRen>(this.resourceUrl, daRen, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    // checkDetail(req?: any): Observable<HttpResponse<DaRen>> {
    //     const options = createRequestOption(req);
    //     return this.http.get<DaRen>(this.checkDetailUrl, {
    //         params: options,
    //         observe: 'response'
    //     });
    // }
}
