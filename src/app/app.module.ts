import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { LocalSharedService } from './local/system/service/local-shared.service';
import { LocalOauthService } from './local/system/service/local-oauth.service';

import { GenieSystemModule } from '../assets/genie-core/system/system.module';

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
    GenieSystemModule
  ],
  providers: [
    LocalSharedService,
    LocalOauthService,
  ],
  bootstrap: [IonicApp]
})

export class AppModule { }
