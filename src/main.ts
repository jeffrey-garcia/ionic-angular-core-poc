import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { ConfigFactory } from './assets/genie-core/system/config/system-config.model';

if (environment.production) {
  enableProdMode();
}

// retrieve the environment file and inject into system config factory
console.log(`configuring environment: ${environment.envName}`);
ConfigFactory.setEnvironment(environment);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
