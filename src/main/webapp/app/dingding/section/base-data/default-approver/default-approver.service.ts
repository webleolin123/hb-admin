/**
 * Created by yl on 2018/4/18.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {DefaultApprover} from './default-approver.model';
import {createRequestOption} from '../../../../shared/model/request-util';
import {WORKFLOW_DEFAULT_APPROVER_API, WORKFLOW_DEFAULT_APPROVER_SEARCH_API} from '../../../../app.constants';

@Injectable()
export class DefaultApproverService {

    private resourceUrl = WORKFLOW_DEFAULT_APPROVER_API;
    private searchUrl = WORKFLOW_DEFAULT_APPROVER_SEARCH_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<DefaultApprover[]>> {
        const options = createRequestOption(req);
        return this.http.get<DefaultApprover[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<DefaultApprover>> {
        return this.http.get<DefaultApprover>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(defaultApprover: DefaultApprover): Observable<HttpResponse<DefaultApprover>> {
        return this.http.put<DefaultApprover>(this.resourceUrl, defaultApprover, {observe: 'response'});
    }

    create(defaultApprover: DefaultApprover): Observable<HttpResponse<DefaultApprover>> {
        return this.http.post<DefaultApprover>(this.resourceUrl, defaultApprover, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
