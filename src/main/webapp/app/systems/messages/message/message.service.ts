import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Message} from './message.model';
import {TASK_MESSAGE_API} from '../../../app.constants'
import {createRequestOption} from '../../../shared/model/request-util';

@Injectable()
export class MessageService {
    messageId: any;
    private resourceUrl = TASK_MESSAGE_API;

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

    delete(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
