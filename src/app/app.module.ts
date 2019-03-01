import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CmpUiThemeModule } from '../assets/cmp-ui-theme/modules/cmp-ui-theme.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CmpUiThemeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
