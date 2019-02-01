/**
 * Created by yl on 2018/5/16.
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {HelpRoles} from './help-roles.model';
import {createRequestOption} from '../../../../shared/model/request-util';
import {WORKFLOW_HELP_ROLES_API} from '../../../../app.constants';

@Injectable()
export class HelpRolesService {

    helpRolesId:any;
    private resourceUrl = WORKFLOW_HELP_ROLES_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<HelpRoles[]>> {
        const options = createRequestOption(req);
        return this.http.get<HelpRoles[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<HelpRoles>> {
        return this.http.get<HelpRoles>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(helpRoles: HelpRoles): Observable<HttpResponse<HelpRoles>> {
        return this.http.put<HelpRoles>(this.resourceUrl, helpRoles, {observe: 'response'});
    }

    create(helpRoles: HelpRoles): Observable<HttpResponse<HelpRoles>> {
        return this.http.post<HelpRoles>(this.resourceUrl, helpRoles, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
