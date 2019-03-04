import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { ConfigFactory } from './assets/genie-core/system/system-config';

if (environment.production) {
  enableProdMode();
}

console.log(`environment country code: ${environment.countryCode}`);
ConfigFactory.setCountryCode(environment.countryCode);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
