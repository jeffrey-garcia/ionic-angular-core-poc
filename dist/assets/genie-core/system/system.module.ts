import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './system-config';

import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';

import { 
  MatDatepickerModule, 
  MatNativeDateModule,
  MatSnackBarModule
} from '@angular/material';

import { UtilService } from './service/util.service';
import { SharedService } from './service/shared.service';
import { OauthService } from './service/oauth.service';

export { UtilService } from './service/util.service';
export { SharedService } from './service/shared.service';
export { OauthService } from './service/oauth.service';
export { AppPublishEvents } from './app.enum';

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
    UtilService,
    SharedService,
    OauthService,
    DeviceDetectorService,
  ],
  bootstrap: []
})

export class GenieSystemModule {
  constructor() {
    console.log(`creating: ${this.constructor.name}`)
  }
}
