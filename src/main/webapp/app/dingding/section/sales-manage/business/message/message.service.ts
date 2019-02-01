/**
 * Created by Administrator on 2018/5/21.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Message} from './message.model';
import {createRequestOption} from '../../../../../shared/model/request-util';
import {WORKFLOW_MESSAGE_API,WORKFLOW_MESSAGE_DETAIL_API } from '../../../../../app.constants';
@Injectable()
export class MessageService {
    messageId: any;
    private resourceUrl = WORKFLOW_MESSAGE_API;
    private checkDetailUrl = WORKFLOW_MESSAGE_DETAIL_API;

    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Message[]>> {
        const options = createRequestOption(req);
        return this.http.get<Message[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Message>> {
        return this.http.get<Message>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(message: Message): Observable<HttpResponse<Message>> {
        return this.http.put<Message>(this.resourceUrl, message, {observe: 'response'});
    }

    create(message: Message): Observable<HttpResponse<Message>> {
        return this.http.post<Message>(this.resourceUrl, message, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    // checkDetail(req?: any): Observable<HttpResponse<Message>> {
    //     const options = createRequestOption(req);
    //     return this.http.get<Message>(this.checkDetailUrl, {
    //         params: options,
    //         observe: 'response'
    //     });
    // }
}
