import { Injectable } from '@angular/core';
@Injectable()
export class LogService {
    debug:boolean;
    constructor() {
        this.debug=true;
    }
    printLog(type,msg){
        if(this.debug){
            console.log(type,msg);
        }
    }
}
