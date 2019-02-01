/**
 * Created by yl on 2018/3/30.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Department} from '../../../common/http/department.model';
import {DepartmentUser} from '../../../common/http/department-user.model';
import {createRequestOption} from '../../../shared/model/request-util';
import {WORKFLOW_DINGDING_DEPARTMENT_LIST_API, WORKFLOW_DINGDING_DEPARTMENT_USER_API} from '../../../app.constants';
@Injectable()
export class DepartmentService {

    private resourceUrl = WORKFLOW_DINGDING_DEPARTMENT_LIST_API;

    private getDepartmentUserUrl = WORKFLOW_DINGDING_DEPARTMENT_USER_API;

    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Department[]>> {
        const options = createRequestOption(req);
        return this.http.get<Department[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    queryDepartmentUser(req?: any): Observable<HttpResponse<DepartmentUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<DepartmentUser[]>(this.getDepartmentUserUrl, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<Department>> {
        return this.http.get<Department>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    update(department: Department): Observable<HttpResponse<Department>> {
        return this.http.put<Department>(this.resourceUrl, department, {observe: 'response'});
    }
    create(department: Department): Observable<HttpResponse<Department>> {
        return this.http.post<Department>(this.resourceUrl, department, {observe: 'response'});
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
