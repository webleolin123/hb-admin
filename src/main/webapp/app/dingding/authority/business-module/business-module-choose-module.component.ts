/**
 * Created by Administrator on 2018/8/1.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BusinessModule} from './business-module.model';
import {BusinessModuleService} from './business-module.service';
import {JhiEventManager} from 'ng-jhipster';
@Component({
    selector: 'ngx-business-module-choose-module-dialog',
    templateUrl: './business-module-choose-module.component.html'
})
export class BusinessModuleChooseModuleComponent implements OnInit {
    businessModules: BusinessModule[];
    childModuleIds: any;
    level: any;
    constructor(public activeModal: NgbActiveModal,
                private businessModuleService: BusinessModuleService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.level = this.businessModuleService.level;
        this.businessModuleService.getParentOrChildModules({level:this.level}).subscribe((response) => {
            this.businessModules = response.body;
        })
    }

    clear(){
        this.activeModal.dismiss('cancle');
    }

    save(){
        if(this.childModuleIds.length != 0){
            this.businessModuleService.childModuleIds = this.childModuleIds.toString();
            this.eventManager.broadcast({name:'chooseAddChildModulesDone',content:"ok"});
            this.clear();
        }else{
            alert('请选择您要添加的子模块');
        }
    }
}
