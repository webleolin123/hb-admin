import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Shelves} from './load-upload.model';
import {createRequestOption} from '../../../../../shared/model/request-util';
import {
    WORKFLOW_SHELVES_API,
    // WORKFLOW_ZHI_TONG_CHE_SEARCH_API,
    // WORKFLOW_ZHI_TONG_CHE_DETAIL_API,
    // WORKFLOW_BUSINESS_EXPORT_DATA_BY_TIME_BETWEEN_API
} from '../../../../../app.constants';

@Injectable()
export class ShelvesService {

    shelveId: any;

    startTime: any;
    endTime: any;

    private resourceUrl = WORKFLOW_SHELVES_API;
    // private exportDataByTimeBetweenUrl = WORKFLOW_BUSINESS_EXPORT_DATA_BY_TIME_BETWEEN_API;
    // private searchUrl = WORKFLOW_ZHI_TONG_CHE_SEARCH_API;
    // private checkDetailUrl = WORKFLOW_ZHI_TONG_CHE_DETAIL_API;
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Shelves[]>> {
        const options = createRequestOption(req);
        return this.http.get<Shelves[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    //
    // exportDataByTimeBetween(req?: any): Observable<HttpResponse<Shelves[]>> {
    //     const options = createRequestOption(req);
    //     return this.http.get<Shelves[]>(this.exportDataByTimeBetweenUrl, {
    //         params: options,
    //         observe: 'response'
    //     });
    // }

    find(id: any): Observable<HttpResponse<Shelves>> {
        return this.http.get<Shelves>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(shelves: Shelves): Observable<HttpResponse<Shelves>> {
        return this.http.put<Shelves>(this.resourceUrl, Shelves, {observe: 'response'});
    }

    create(shelves: Shelves): Observable<HttpResponse<Shelves>> {
        return this.http.post<Shelves>(this.resourceUrl, Shelves, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    // checkDetail(req?: any): Observable<HttpResponse<Shelves>> {
    //     const options = createRequestOption(req);
    //     return this.http.get<Shelves>(this.checkDetailUrl, {
    //         params: options,
    //         observe: 'response'
    //     });
    // }
}
