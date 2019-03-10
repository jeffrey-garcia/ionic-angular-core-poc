import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SingleClickDirective } from './directive/single-click/single-click.directive';
import { StarIndicatorComponent } from './component/star-indicator/star-indicator.component';
import { BackButtonComponent } from './component/back-button/back-button.component';
import { CmpTopToastComponent } from './component/cmp-top-toast/cmp-top-toast.component';
import { AlertDialogComponent } from './component/dialog-alert-component/alert-dialog.component';
import { EmptyListPageComponent } from './component/empty-list/containers/empty-list-page/empty-list-page.component';
import { EmptyListMessageComponent } from './component/empty-list/components/empty-list-message/empty-list-message.component';

import { 
  GenieSystemModule, 
  SharedService, 
  OauthService, 
  UtilService 
} from '../system/system.module';

import { MaterialModule } from './material.module';

import { CmpUiThemeModule } from 'manulife-mobile-ionic-angular-ui/dist';

export { AppPublishEvents } from '../app/model/app.enum';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    CmpUiThemeModule,
    IonicPageModule.forChild([EmptyListPageComponent]),
    GenieSystemModule,
  ],
  declarations: [
    SingleClickDirective,
    StarIndicatorComponent,
    BackButtonComponent,
    CmpTopToastComponent,
    AlertDialogComponent,
    EmptyListPageComponent,
    EmptyListMessageComponent,
  ],
  exports: [
    SingleClickDirective,
    StarIndicatorComponent,
    BackButtonComponent,
    CmpTopToastComponent,
    AlertDialogComponent,
    EmptyListPageComponent,
  ],
  providers: [
    SharedService,
    OauthService,
    UtilService,
  ]
})
export class GenieAppUiModule { 
  constructor() {
    console.log(`creating: ${this.constructor.name}`);
  }
}
