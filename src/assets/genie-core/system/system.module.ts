import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 

import { UtilService } from './service/util.service';
import { SharedService } from './service/shared.service';
import { OauthService } from './service/oauth.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './locale/supported-locale.model';

import { 
  MatDatepickerModule, MatNativeDateModule
} from '@angular/material';

export { UtilService } from './service/util.service';
export { SharedService } from './service/shared.service';
export { OauthService } from './service/oauth.service';
export { AppPublishEvents } from './app.enum';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),   
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  exports: [],
  declarations: [],
  entryComponents: [],
  providers: [
    UtilService,
    SharedService,
    OauthService
  ],
  bootstrap: []
})
export class GenieSystemModule {
  constructor() {
    console.log(`creating: ${this.constructor.name}`)
  }
}
