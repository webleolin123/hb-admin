import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Tabooed} from './tabooed.model';
import {BASE_TABOOED_WORDS_API} from '../../../app.constants'
import {createRequestOption} from '../../../shared/model/request-util';

@Injectable()
export class TabooedService {
    tabooedId: any;
    private resourceUrl = BASE_TABOOED_WORDS_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Tabooed[]>> {
        const options = createRequestOption(req);
        return this.http.get<Tabooed[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Tabooed>> {
        return this.http.get<Tabooed>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(tabooed: Tabooed): Observable<HttpResponse<Tabooed>> {
        return this.http.put<Tabooed>(this.resourceUrl, tabooed, {observe: 'response'});
    }

    create(tabooed: Tabooed): Observable<HttpResponse<Tabooed>> {
        return this.http.post<Tabooed>(this.resourceUrl, tabooed, {observe: 'response'});
    }

    delete(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

}
