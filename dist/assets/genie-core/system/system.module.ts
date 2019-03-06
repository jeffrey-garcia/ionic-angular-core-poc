import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './config/locale-config.model';

import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';

import { 
  MatDatepickerModule, 
  MatNativeDateModule,
  MatSnackBarModule
} from '@angular/material';

import { UtilService } from './service/util.service';
import { SharedService } from './service/shared.service';
import { OauthService } from './service/oauth.service';
import { AppHttpInterceptor } from './interceptor/app-http-interceptor';
import { WindowRef } from './scripts/WindowRef';

export { UtilService } from './service/util.service';
export { SharedService, Months } from './service/shared.service';
export { OauthService } from './service/oauth.service';
export { AppHttpInterceptor } from './interceptor/app-http-interceptor';
export { WindowRef } from './scripts/WindowRef';
export { createTranslateLoader, LocaleConfig, SystemLocale, getDefaultLocaleByCountryCode, getSupportedLocaleByCountryCode } from './config/locale-config.model';
export { ConfigFactory, CountryConfig, SystemCountry } from './config/system-config.model';
export { Currency, CurrencyConfig, SystemCurrency } from './config/currency-config.model';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DeviceDetectorModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    MatDatepickerModule, 
    MatNativeDateModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      [{ path: 'dummy', redirectTo: '/dummy', pathMatch: 'full' }],
      { enableTracing: false }
    ),
  ],
  exports: [],
  declarations: [],
  entryComponents: [],
  providers: [
    WindowRef,
    UtilService,
    SharedService,
    OauthService,
    DeviceDetectorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
	  },
  ],
  bootstrap: []
})

export class GenieSystemModule {
  constructor() {
    console.log(`creating: ${this.constructor.name}`)
  }
}
