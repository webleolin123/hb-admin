import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Dict} from './dict.model';
import {DictService} from './dict.service';
import {HttpResponse} from '@angular/common/http';
import {JhiAlertService} from "ng-jhipster";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector: 'jhi-dict-detail',
    templateUrl: './dict-detail.component.html',
    styleUrls:['../../../../content/scss/detail.scss']
})
export class DictDetailComponent implements OnInit {
    dict: Dict;
    constructor(private dictService: DictService,
                private route: ActivatedRoute,
                private alertService: JhiAlertService,
                public activeModal: NgbActiveModal,) {

    }
    ngOnInit() {
        if (this.dictService.dictId) {
            this.dictService.find(this.dictService.dictId).subscribe((response) => {
                this.dict = response.body;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
}
