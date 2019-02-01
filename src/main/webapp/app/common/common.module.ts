import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HbadminSharedModule} from '../shared';
import {
// chart图表封装
    ClfViewDataComponent,// 引入封装组件
    ChartService,//引入chart类
    LogService,//引入自定义log服务
//导出数据封装
    ExportDataFilterComponent,
    CustomPipe,
    OperationPipe,
    ContainPipe,
    HtmlPipe,
} from './';
@NgModule({
    imports: [
        HbadminSharedModule,
    ],
    declarations: [
        ClfViewDataComponent,
        ExportDataFilterComponent,
        CustomPipe,
        OperationPipe,
        ContainPipe,
        HtmlPipe,
    ],
    providers: [
        ChartService,
        LogService,
    ],
    entryComponents: [
        ClfViewDataComponent,
        ExportDataFilterComponent,
    ],
    exports: [
        ClfViewDataComponent,
        ExportDataFilterComponent,
        HbadminSharedModule,
        CustomPipe,
        OperationPipe,
        ContainPipe,
        HtmlPipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HbadminCommondModule {}
