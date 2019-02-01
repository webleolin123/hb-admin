import { Routes } from '@angular/router';
import { AttendanceComponent } from './atttendance.component';
import { AttendanceDetailComponent } from './attendance-detail.component';

// 导出
export const attendanceRoute: Routes = [
    {
        path: 'attendance',
        component: AttendanceComponent,
        data: {
            pageTitle: '考勤'
        },
    },
    {
        path: 'attendance/attendance-detail',
        component: AttendanceDetailComponent,
        data: {
            pageTitle: '记录查看'
        },
    }
];
export const attendanceComponent = [
    AttendanceComponent,
    AttendanceDetailComponent,
];
