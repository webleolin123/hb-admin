import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Price} from './price.model';
import {createRequestOption} from '../../../../../shared/model/request-util';
import {
    WORKFLOW_PRICE_MANAGE_API,
} from '../../../../../app.constants';

@Injectable()
export class PriceService {

    priceId: any;

    startTime: any;
    endTime: any;

    private resourceUrl = WORKFLOW_PRICE_MANAGE_API;
    // private exportDataByTimeBetweenUrl = WORKFLOW_BUSINESS_EXPORT_DATA_BY_TIME_BETWEEN_API;
    // private searchUrl = WORKFLOW_ZHI_TONG_CHE_SEARCH_API;
    // private checkDetailUrl = WORKFLOW_ZHI_TONG_CHE_DETAIL_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Price[]>> {
        const options = createRequestOption(req);
        return this.http.get<Price[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    //
    // exportDataByTimeBetween(req?: any): Observable<HttpResponse<Price[]>> {
    //     const options = createRequestOption(req);
    //     return this.http.get<Price[]>(this.exportDataByTimeBetweenUrl, {
    //         params: options,
    //         observe: 'response'
    //     });
    // }

    find(id: any): Observable<HttpResponse<Price>> {
        return this.http.get<Price>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(price: Price): Observable<HttpResponse<Price>> {
        return this.http.put<Price>(this.resourceUrl, price, {observe: 'response'});
    }

    create(price: Price): Observable<HttpResponse<Price>> {
        return this.http.post<Price>(this.resourceUrl, price, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    // checkDetail(req?: any): Observable<HttpResponse<Price>> {
    //     const options = createRequestOption(req);
    //     return this.http.get<Price>(this.checkDetailUrl, {
    //         params: options,
    //         observe: 'response'
    //     });
    // }
}
