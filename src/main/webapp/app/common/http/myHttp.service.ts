import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ApproverCommonInfo} from './approve-common.model';
import {createRequestOption} from '../../shared/model/request-util';
@Injectable()
export class MyHttpService {
    approverCommonId: any;
    startTime: any;//用于保存导出操作的开始时间
    endTime: any;//用于保存导出操作结束始时间
    resourceUrl:any; //模块的请求地址
    resourceUrl_search:any; //模块的查询请求地址
    resourceUrl_batch_edit:any; //模块的查询批量编辑地址请求地址
    resourceUrl_batch_delete:any; //模块的查询批量删除地址请求地址
    exportUrl:any; //导出请求地址
    resourceUrl_getTrend:any; //趋势图请求地址
    resourceUrl_viewData_year:any; //趋势图请求年数据
    resourceUrl_viewData_month:any; //趋势图请求月数据
    resourceUrl_viewData_day:any; //趋势图请求天数据
    resourceUrl_getMapData:any; //地图封装请求数据
    tmp:any; //存放临时条件比如跳转查询的条件（见角色管理--查看人员）
    searchType:any; //存放临时条件比如跳转查询的条件（见角色管理--4）
    time:any; //存放临时条件比如月份2018-11
    detailUrl:any; //存放父传子的请求地址
    // 错漏发改写
    list:any; //存放数组
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<ApproverCommonInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<ApproverCommonInfo[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    getMapData(req?: any): Observable<HttpResponse<ApproverCommonInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<ApproverCommonInfo[]>(this.resourceUrl_getMapData, {
            params: options,
            observe: 'response'
        });
    }
    getTrendData(req?: any): Observable<HttpResponse<ApproverCommonInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<ApproverCommonInfo[]>(this.resourceUrl_getTrend, {
            params: options,
            observe: 'response'
        });
    }
    view_year(req?: any): Observable<HttpResponse<ApproverCommonInfo>> {
        const options = createRequestOption(req);
        return this.http.get<ApproverCommonInfo>(this.resourceUrl_viewData_year, {
            params: options,
            observe: 'response'
        });
    }
    view_month(req?: any): Observable<HttpResponse<ApproverCommonInfo>> {
        const options = createRequestOption(req);
        return this.http.get<ApproverCommonInfo>(this.resourceUrl_viewData_month, {
            params: options,
            observe: 'response'
        });
    }
    view_day(req?: any): Observable<HttpResponse<ApproverCommonInfo>> {
        const options = createRequestOption(req);
        return this.http.get<ApproverCommonInfo>(this.resourceUrl_viewData_day, {
            params: options,
            observe: 'response'
        });
    }
    search(req?: any): Observable<HttpResponse<ApproverCommonInfo[]>> {
        const options = createRequestOption(req);
        if(req){
            if(req.shopName){
                options.set('shopName',req.shopName);
            }
            if(req.reducePrice){
                options.set('reducePrice',req.reducePrice);
            }
            if(req.limitPrice){
                options.set('limitPrice',req.limitPrice);
            }
            if(req.applyType){
                options.set('applyType',req.applyType);
            }
            if(req.breakingPrice){
                options.set('breakingPrice',req.breakingPrice);
            }
            if(req.applicant){
                options.set('applicant',req.applicant);
            }
            if(req.applyReason){
                options.set('applyReason',req.applyReason);
            }
            if(req.applicant){
                options.set('applicant',req.applicant);
            }
            if(req.startDate){
                options.set('startDate',req.startDate);
            }
            if(req.endDate){
                options.set('endDate',req.endDate);
            }
            if(req.page){
                options.set('page',req.page);
            }
            if(req.size){
                options.set('size',req.size);
            }
        }
        return this.http.get<ApproverCommonInfo[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
    export(req?: any): Observable<HttpResponse<ApproverCommonInfo[]>> {
        const options = createRequestOption(req);
        if(req){
            if(req.startTime){
                options.set('size',req.startTime);
            }
            if(req.endTime){
                options.set('size',req.startTime);
            }
            if(req.year){
                options.set('size',req.year);
            }
            if(req.month){
                options.set('size',req.month);
            }
        }
        return this.http.get<ApproverCommonInfo[]>(this.exportUrl, {
            params: options,
            observe: 'response'
        });
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
    find(id: any): Observable<HttpResponse<ApproverCommonInfo>> {
        return this.http.get<ApproverCommonInfo>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    update(approverCommonInfo: ApproverCommonInfo): Observable<HttpResponse<ApproverCommonInfo>> {
        return this.http.put<ApproverCommonInfo>(this.resourceUrl, approverCommonInfo, {observe: 'response'});
    }
    create(approverCommonInfo: ApproverCommonInfo): Observable<HttpResponse<ApproverCommonInfo>> {
        return this.http.post<ApproverCommonInfo>(this.resourceUrl, approverCommonInfo, {observe: 'response'});
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    add(approverCommonInfo: ApproverCommonInfo): Observable<HttpResponse<ApproverCommonInfo>> {
        const options = createRequestOption(approverCommonInfo);
        return this.http.put<ApproverCommonInfo>(this.resourceUrl,approverCommonInfo, {
            params: options,
            observe: 'response'
        });
    }
    batch_update(approverCommonInfo: ApproverCommonInfo): Observable<HttpResponse<ApproverCommonInfo>> {
        const options = createRequestOption(approverCommonInfo);
        return this.http.put<ApproverCommonInfo>(this.resourceUrl_batch_edit,approverCommonInfo, {
            params: options,
            observe: 'response'
        });
    }
    batch_delete(list:any): Observable<HttpResponse<ApproverCommonInfo>> {
        return this.http.delete(`${this.resourceUrl_batch_delete}?list=${list}`, {observe: 'response'});
    }
}
