import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { LocalSharedService } from './local/system/service/local-shared.service';
import { LocalOauthService } from './local/system/service/local-oauth.service';
import { LocalUtilService } from './local/system/service/local-util.service';

import { GenieSystemModule, SharedService, OauthService, UtilService } from '../assets/genie-core/system/system.module';
import { GenieAppUiModule } from '../assets/genie-core/app/app-ui.module';
import { AppHttpInterceptor } from '../assets/genie-core/system/interceptor/app-http-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(
      AppComponent, 
      {mode: 'md'} // enforce the theme to material design regardless of running platform
    ),
    GenieSystemModule,
    GenieAppUiModule
  ],
  providers: [
    LocalSharedService,
    LocalOauthService,
    LocalUtilService,
    // use local singleton service providers to override core
    { provide: SharedService, useExisting: LocalSharedService },
    { provide: OauthService, useExisting: LocalOauthService },
    { provide: UtilService, useExisting: LocalUtilService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
	  },
  ],
  bootstrap: [IonicApp]
})

export class AppModule { }
