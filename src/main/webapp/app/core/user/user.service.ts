import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {
    SERVER_API_URL,
    USER_BASE_API_URL,
    BASE_SYS_DICT_FINDALL_BY_PARENT_KIND_API,
    USER_AUTHORITY_API,
    USER_CHANGE_PASSWORD_API,
    WORKFLOW_GET_DEPARTMENT_LIST_API,
    WORKFLOW_GET_DEPARTMENT_USER_API,
    WORKFLOW_DINGDING_GET_USER_INFO_API,
    USER_BASE_SEARCHUSER_API,
} from '../../app.constants';
import {User} from './user.model';
import {createRequestOption} from '../../shared/model/request-util';
import {Department} from "../../shared/user/department.model";
import {DingPerson} from "../../shared/user/ding-person.model";
@Injectable()
export class UserService {
    brandId: any;
    shopId: any;
    categoryId: any;
    labelId: any;
    articleId: any;
    login: any;// 用户
    labelImageUrl: string;
    parentKind: string;
    storeName: string;
    private resourceUrl = SERVER_API_URL + 'uaa/api/users';
    private userResourceUrl = USER_BASE_API_URL;
    private dictFindByParentKindUrl = BASE_SYS_DICT_FINDALL_BY_PARENT_KIND_API;
    private userAuthorityUrl = USER_AUTHORITY_API;
    private changePswUrl = USER_CHANGE_PASSWORD_API;
    private getDepartmentListUrl = WORKFLOW_GET_DEPARTMENT_LIST_API;
    private getDepartmentUserUrl = WORKFLOW_GET_DEPARTMENT_USER_API;
    private getEnterpriseInfoUrl = WORKFLOW_DINGDING_GET_USER_INFO_API;
    private userResourceUrl_search = USER_BASE_SEARCHUSER_API;
    constructor(private http: HttpClient) {
    }
    search(req?: any): Observable<HttpResponse<User[]>> {
        const options = createRequestOption(req);
        return this.http.get<User[]>(this.userResourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
    create(user: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(this.resourceUrl, user, {observe: 'response'});
    }

    update(user: User): Observable<HttpResponse<User>> {
        return this.http.put<User>(this.resourceUrl, user, {observe: 'response'});
    }

    find(login: string): Observable<HttpResponse<User>> {
        return this.http.get<User>(`${this.resourceUrl}/${login}`, {observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<User[]>> {
        const options = createRequestOption(req);
        return this.http.get<User[]>(this.userResourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    getEnterpriseInfo(req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get<any>(this.getEnterpriseInfoUrl, {
            params: options,
            observe: 'response'
        });
    }

    getDepartmentList(req?: any): Observable<HttpResponse<Department[]>> {
        const options = createRequestOption(req);
        return this.http.get<Department[]>(this.getDepartmentListUrl, {
            params: options,
            observe: 'response'
        });
    }

    getDepartmentUser(req?: any): Observable<HttpResponse<DingPerson[]>> {
        const options = createRequestOption(req);
        return this.http.get<DingPerson[]>(this.getDepartmentUserUrl, {
            params: options,
            observe: 'response'
        });
    }

    findDict(req?: any): Observable<HttpResponse<User[]>> {
        const options = createRequestOption(req);
        return this.http.get<User[]>(this.dictFindByParentKindUrl, {
            params: options,
            observe: 'response'
        });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, {observe: 'response'});
    }

    authorities(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.userAuthorityUrl, {observe: 'response'});
    }

    changePsw(password:any): Observable<any> {
    return this.http.post<any>(this.changePswUrl, {password:password}, {observe: 'response'});
}

    exportCsv(obj,csvName) {
        const title = obj.title;
        //titleForKey ["","",""]
        const titleForKey = obj.titleForKey;
        const data = obj.data;
        const str = [];
        str.push(obj.title.join(",") + "\n");
        for (let i = 0; i < data.length; i++) {
            const temp = [];
            for (let j = 0; j < titleForKey.length; j++) {
                temp.push(data[i][titleForKey[j]]);
            }
            str.push(temp.join(",") + "\n");
        }
        const compatible = "\uFEFF";
        const blob = new Blob([compatible + str.join("")], {type: 'text/csv;charset=utf-8;'});
        // const uri = 'data:text/csv;charset=gb2312;' + encodeURIComponent(str.join(""));
        const uri = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = csvName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
