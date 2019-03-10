import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication/login/login.component';

import { SharedService, OauthService, UtilService } from '../system/system.module';

export { LoginComponent } from './authentication/login/login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    SharedService,
    OauthService,
    UtilService
  ]
})
export class GenieFeatureModule {
  constructor() {
    console.log(`creating: ${this.constructor.name}`);
  }
 }
