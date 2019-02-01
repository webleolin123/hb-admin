// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { ProdConfig } from './blocks/config/prod.config';
// import { HbadminAppModule } from './app.module';
//
// ProdConfig();
//
// if (module['hot']) {
//     module['hot'].accept();
// }
//
// platformBrowserDynamic().bootstrapModule(HbadminAppModule)
// .then((success) => console.log(`Application started`))
// .catch((err) => console.error(err));
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HbadminAppModule } from './app.module';
import { environment } from '../environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(HbadminAppModule)
    .catch(err => console.error(err));
