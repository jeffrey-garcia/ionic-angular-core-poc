import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { ConfigFactory } from './assets/genie-core/system/system-config';

if (environment.production) {
  enableProdMode();
}

// retrieve the country code from environment file and inject into system config factory
console.log(`environment country code: ${environment.countryCode}`);
ConfigFactory.setCountryCode(environment.countryCode);
ConfigFactory.setSalesforceApi(environment.salesforce);
ConfigFactory.setMobileApi(environment.mobile);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
