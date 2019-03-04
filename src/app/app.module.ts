import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
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
    RouterModule.forRoot(
      [{ path: 'dummy', redirectTo: '/dummy', pathMatch: 'full' }],
      { enableTracing: false }
    ),
    GenieSystemModule
  ],
  providers: [
    LocalOauthService,
  ],
  bootstrap: [IonicApp]
})

export class AppModule { }
