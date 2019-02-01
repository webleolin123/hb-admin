import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MyHttpService} from '../http/myHttp.service';
import {JhiEventManager} from 'ng-jhipster';
import * as $ from 'jquery';
@Component({
    selector: 'jhi-export-data-filter-dialog',
    templateUrl: './export-data-filter.component.html'
})

export class ExportDataFilterComponent implements OnInit{
    startTime: any;
    endTime: any;
    constructor(
        public activeModal: NgbActiveModal,
        private exportDataFilter: MyHttpService,
        private eventManager: JhiEventManager,
        ) {
    }
    ngOnInit(){}
    clear(){
        this.activeModal.dismiss('cancel');
    }
    save() {
        if (this.startTime && this.endTime) {
            this.exportDataFilter.startTime = $('#startTime').val();
            this.exportDataFilter.endTime = $('#endTime').val();
            this.eventManager.broadcast({name: 'exportDataFilterChooseDone', content: 'OK'});
            this.clear();
        } else {
            alert('开始或结束时间不能为空！');
        }
    }
}
