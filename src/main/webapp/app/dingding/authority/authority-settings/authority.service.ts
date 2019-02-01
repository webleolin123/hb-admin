/**
 * Created by Administrator on 2018/7/23.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Authority} from './authority.model';
import {createRequestOption} from '../../../shared/model/request-util';
import {
    WORKFLOW_BUSINESS_PERMISSION_API,
    WORKFLOW_BUSINESS_PERMISSION_CREATE_PERMISSIONS_API,
    WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API,
    WORKFLOW_BUSINESS_PERMISSION_APPROVE_PERMISSIONS_API,
    WORKFLOW_BUSINESS_PERMISSION_SEARCH_API,
} from '../../../app.constants';
@Injectable()
export class AuthorityService {
    authorityId: any;

    private resourceUrl = WORKFLOW_BUSINESS_PERMISSION_API;
    private createPermissonsUrl = WORKFLOW_BUSINESS_PERMISSION_CREATE_PERMISSIONS_API;
    private getPermissionsByModuleIdUrl = WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API;
    private searchApprovePermissionsUrl = WORKFLOW_BUSINESS_PERMISSION_APPROVE_PERMISSIONS_API;
    // private searchUrl = WORKFLOW_BUSINESS_PERMISSION_SEARCH_API;
    private searchUrl = WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Authority[]>> {
        const options = createRequestOption(req);
        return this.http.get<Authority[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    getPermissionsByModuleId(req?: any): Observable<HttpResponse<Authority[]>> {
        const options = createRequestOption(req);
        return this.http.get<Authority[]>(this.getPermissionsByModuleIdUrl, {
            params: options,
            observe: 'response'
        });
    }

    createPermissons(authority: Authority): Observable<HttpResponse<Authority>> {
        return this.http.post<Authority>(this.createPermissonsUrl, authority, {observe: 'response'});
    }

    find(id: any): Observable<HttpResponse<Authority>> {
        return this.http.get<Authority>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(authority: Authority): Observable<HttpResponse<Authority>> {
        return this.http.put<Authority>(this.resourceUrl, authority, {observe: 'response'});
    }

    create(authority: Authority): Observable<HttpResponse<Authority>> {
        return this.http.post<Authority>(this.resourceUrl, authority, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Authority[]>> {
        const options = createRequestOption(req);
        if(req){
            if(req.dingPersonId){
                options.set('dingPersonId',req.dingPersonId);
            }
            if(req.permissionType){
                options.set('permissionType',req.permissionType);
            }
            if(req.brandRange){
                options.set('brandRange',req.brandRange);
            }
            if(req.businessModuleId){
                options.set('businessModuleId',req.businessModuleId);
            }
            if(req.approvePermissionValue){
                options.set('approvePermissionValue',req.approvePermissionValue);
            }
        }
        return this.http.get<Authority[]>(this.searchUrl, {
            params: options,
            observe: 'response'
        });
    }
}
