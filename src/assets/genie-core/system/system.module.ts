import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilService } from './service/util.service';
import { SharedService } from './service/shared.service';
import { OauthService } from './service/oauth.service';

export { UtilService } from './service/util.service';
export { SharedService } from './service/shared.service';
export { OauthService } from './service/oauth.service';
export { AppPublishEvents } from './app.enum';

@NgModule({
  imports: [
    CommonModule
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
