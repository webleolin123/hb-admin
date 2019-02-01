import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Dict} from './dict.model';
import {createRequestOption} from '../../../shared/model/request-util';
import {
    SERVER_API_URL,
    BASE_SYS_DICT_API,
    BASE_SYS_DICT_BYKIND,
    BASE_SYS_DICT_BYPARENT_ID,
    BASE_SYS_DICT_BYPARENT_KIND,
} from '../../../app.constants';

@Injectable()
export class DictService {
    dictId: any;
    parentId: any;
    public isCreateMainDict;
    private resourceUrl = BASE_SYS_DICT_API;

    private dictByKindUrl = BASE_SYS_DICT_BYKIND;
    private dictByParentIdUrl = BASE_SYS_DICT_BYPARENT_ID;
    private dictByParentKindUrl = BASE_SYS_DICT_BYPARENT_KIND;

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<HttpResponse<Dict[]>> {
        return this.http.get<Dict[]>(this.resourceUrl, {observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Dict[]>> {
        const options = createRequestOption(req);
        return this.http.get<Dict[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    searchByKind(req?: any): Observable<HttpResponse<Dict>> {
        const options = createRequestOption(req);
        return this.http.get<Dict>(this.dictByKindUrl, {
            params: options,
            observe: 'response'
        });
    }

    queryMainList(req?: any): Observable<HttpResponse<Dict[]>> {
        const options = createRequestOption(req);
        return this.http.get<Dict[]>(this.dictByParentIdUrl, {
            params: options,
            observe: 'response'
        });
    }

    queryAllByParentKind(req?: any): Observable<HttpResponse<Dict[]>> {
        const options = createRequestOption(req);
        return this.http.get<Dict[]>(this.dictByParentKindUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Dict>> {
        return this.http.get<Dict>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(dict: Dict): Observable<HttpResponse<Dict>> {
        return this.http.put<Dict>(this.resourceUrl, dict, {observe: 'response'});
    }

    create(dict: Dict): Observable<HttpResponse<Dict>> {
        return this.http.post<Dict>(this.resourceUrl, dict, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
