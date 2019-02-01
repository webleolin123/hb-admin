// import { of as observableOf,  Observable } from 'rxjs';
import {Injectable} from '@angular/core';
@Injectable()
export class ChartService {
    // 请求地址中转
    resourceUrl_viewData_year:any; //请求年URL
    resourceUrl_viewData_month:any;//请求月URL
    resourceUrl_viewData_day:any; //请求日URL
    result:any;
    // chartData:any;
    constructor() {}
    //
    // getChartData(): Observable<any> {
    //     return observableOf(this.chartData);
    // }
}
