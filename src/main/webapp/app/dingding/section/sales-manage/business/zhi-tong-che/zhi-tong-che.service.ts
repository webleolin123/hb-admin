/**
 * Created by yl on 2018/4/18.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ZhiTongChe} from './zhi-tong-che.model';
import {createRequestOption} from '../../../../../shared/model/request-util';
import {
    WORKFLOW_ZHI_TONG_CHE_API,
    WORKFLOW_ZHI_TONG_CHE_SEARCH_API,
    WORKFLOW_ZHI_TONG_CHE_DETAIL_API,
    WORKFLOW_ZHI_TONG_CHE_EXPORT_API
} from '../../../../../app.constants';
@Injectable()
export class ZhiTongCheService {
    zhiTongCheId: any;
    startTime: any;
    endTime: any;
    private resourceUrl = WORKFLOW_ZHI_TONG_CHE_API;
    private exportDataByTimeBetweenUrl = WORKFLOW_ZHI_TONG_CHE_EXPORT_API;
    private searchUrl = WORKFLOW_ZHI_TONG_CHE_SEARCH_API;
    // private checkDetailUrl = WORKFLOW_ZHI_TONG_CHE_DETAIL_API;
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<ZhiTongChe[]>> {
        const options = createRequestOption(req);
        return this.http.get<ZhiTongChe[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    exportDataByTimeBetween(req?: any): Observable<HttpResponse<ZhiTongChe[]>> {
        const options = createRequestOption(req);
        return this.http.get<ZhiTongChe[]>(this.exportDataByTimeBetweenUrl, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<ZhiTongChe>> {
        return this.http.get<ZhiTongChe>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(zhiTongChe: ZhiTongChe): Observable<HttpResponse<ZhiTongChe>> {
        return this.http.put<ZhiTongChe>(this.resourceUrl, zhiTongChe, {observe: 'response'});
    }

    create(zhiTongChe: ZhiTongChe): Observable<HttpResponse<ZhiTongChe>> {
        return this.http.post<ZhiTongChe>(this.resourceUrl, zhiTongChe, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
