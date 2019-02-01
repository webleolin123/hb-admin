/**
 * Created by yl on 2018/4/18.
 */
import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "../../../../../core/auth/principal.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ActionProcessService} from "./action-process.service";
import {ActionProcess} from "./action-process.model";
@Component({
    selector: 'ngx-action-process',
    templateUrl: './action-process.component.html',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `]
})
export class ActionProcessComponent implements OnInit {
    currentAccount: any;
    // settings = {
    //     add: {
    //         addButtonContent: '<i class="nb-plus"></i>',
    //         createButtonContent: '<i class="nb-checkmark"></i>',
    //         cancelButtonContent: '<i class="nb-close"></i>',
    //         confirmCreate: true
    //     },
    //     edit: {
    //         editButtonContent: '<i class="nb-edit"></i>',
    //         saveButtonContent: '<i class="nb-checkmark"></i>',
    //         cancelButtonContent: '<i class="nb-close"></i>',
    //         confirmSave: true
    //     },
    //     delete: {
    //         deleteButtonContent: '<i class="nb-trash"></i>',
    //         confirmDelete: true,
    //     },
    //     columns: {
    //         id: {
    //             title: 'ID',
    //             type: 'number',
    //         },
    //         businessType: {
    //             title: '业务类型',
    //             type: 'number',
    //         },
    //         actionType: {
    //             title: '流程',
    //             type: 'string',
    //         },
    //         actor: {
    //             title: '操作者',
    //             type: 'string',
    //         },
    //         actionDesc: {
    //             title: '操作说明',
    //             type: 'string',
    //         },
    //         actionLevel: {
    //             title: '紧急度',
    //             type: 'number',
    //         },
    //         priority: {
    //             title: '优先级',
    //             type: 'number',
    //         },
    //         actionTime: {
    //             title: '时间',
    //             type: 'string',
    //         },
    //         remark: {
    //             title: '备注',
    //             type: 'string',
    //         },
    //     },
    // };

    // source: LocalDataSource = new LocalDataSource();

    constructor(
                private principal: Principal,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private actionProcessService: ActionProcessService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
    }

    // 删除
    onDeleteConfirm(event): void {
        console.log(event);
        if (window.confirm('确定删除该条目?')) {
            this.actionProcessService.delete(event.data.id).subscribe((response) => {
                event.confirm.resolve();
                this.eventManager.broadcast({
                    name: 'actionProcessListModification',
                    content: 'Deleted a actionProcess'
                });
            });
        } else {
            event.confirm.reject();
        }
    }

    // 修改
    onSaveConfirm(event): void {
        this.actionProcessService.update(event.newData).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.loadAll();
                } else {
                    this.onError(response);
                }
            }
        );
        // console.log(event);
        // if (window.confirm('确定修改该条目?')) {
        //     event.confirm.resolve();
        //     this.actionProcessService.update(event.newData).subscribe(
        //         (response) => {
        //             if (response.status === 200) {
        //                 this.loadAll();
        //             } else {
        //                 this.onError(response);
        //             }
        //         }
        //     );
        // } else {
        //     event.confirm.reject();
        // }
    }

    // 创建
    onCreateConfirm(event): void {
        // console.log(event)
        this.actionProcessService.create(event.newData).subscribe((response) => this.eventManager.broadcast({
            name: 'actionProcessListModification',
            content: 'OK'
        }), (err) => this.onError(err));
        // if (window.confirm('确定创建该条目?')) {
        //     console.log(event.data);
        //     // event.confirm.resolve();
        // } else {
        //     event.confirm.reject();
        // }
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('actionProcessListModification', (response) => this.loadAll());
    }

    loadAll() {
        this.actionProcessService.query({size: 99999999}).subscribe(
            (res: HttpResponse<(ActionProcess)[]>) => this.onSuccess(res),
            (res: Response) => this.onError(res.json())
            // (data) =>{this.source.load(data.body);},
            // (error)=>{this.alertService.error(error.error, error.message, null);}
        );
    }

    private onSuccess(data) {
        // this.source.load(data.body);
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
