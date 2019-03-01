import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from 'ionic-angular';
import {CommonModule}   from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NavtabAddComponent} from '../components/navtab-add/navtab-add.component';

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavtabAddComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    NavtabAddComponent,
  ],
  providers: [],
})
export class CmpUiThemeModule { }
