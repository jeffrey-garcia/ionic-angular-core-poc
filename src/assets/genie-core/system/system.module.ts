import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilService } from './service/util.service';

export { UtilService } from './service/util.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [],
  entryComponents: [],
  providers: [
    UtilService
  ],
  bootstrap: []
})
export class GenieSystemModule {
  constructor() {
    console.log(`creating: ${this.constructor.name}`)
  }
}
