import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { GenieSystemModule } from '../assets/genie-core/system/system.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GenieSystemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
