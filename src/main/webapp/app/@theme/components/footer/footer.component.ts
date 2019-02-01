import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'ngx-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    constructor(private router: Router){

    }

    support(){
        this.router.navigate(['/systems/system/browser-support']);
    }
}
