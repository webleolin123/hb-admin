import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Notification} from './notification.model';
import {createRequestOption} from '../../../shared/model/request-util';
import {
    SERVER_API_URL,
    WORKFLOW_Notification_API,
} from '../../../app.constants';

@Injectable()
export class NotificationService {

    notificationId: any;
    notificationLogin: any;
    private resourceUrl = SERVER_API_URL + WORKFLOW_Notification_API;
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Notification[]>> {
        const options = createRequestOption(req);
        return this.http.get<Notification[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Notification>> {
        return this.http.get<Notification>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(notification: Notification): Observable<HttpResponse<Notification>> {
        return this.http.put<Notification>(this.resourceUrl, notification, {observe: 'response'});
    }

    create(notification: Notification): Observable<HttpResponse<Notification>> {
        return this.http.post<Notification>(this.resourceUrl, notification, {observe: 'response'});
    }

    delete(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
