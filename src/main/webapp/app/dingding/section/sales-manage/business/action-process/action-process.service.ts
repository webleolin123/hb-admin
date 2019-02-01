/**
 * Created by yl on 2018/4/18.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ActionProcess} from './action-process.model';
import {createRequestOption} from '../../../../../shared/model/request-util';
import {WORKFLOW_ACTION_PROCESS_API, WORKFLOW_ACTION_PROCESS_SEARCH_API} from '../../../../../app.constants';

@Injectable()
export class ActionProcessService {

    private resourceUrl = WORKFLOW_ACTION_PROCESS_API;
    private searchUrl = WORKFLOW_ACTION_PROCESS_SEARCH_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<ActionProcess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ActionProcess[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<ActionProcess>> {
        return this.http.get<ActionProcess>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(actionProcess: ActionProcess): Observable<HttpResponse<ActionProcess>> {
        return this.http.put<ActionProcess>(this.resourceUrl, actionProcess, {observe: 'response'});
    }

    create(actionProcess: ActionProcess): Observable<HttpResponse<ActionProcess>> {
        return this.http.post<ActionProcess>(this.resourceUrl, actionProcess, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
