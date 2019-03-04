import { Component } from '@angular/core';

import { 
  SharedService, 
  OauthService, 
  UtilService 
} from '../assets/genie-core/system/system.module';

import { LocalOauthService } from './local/system/service/local-oauth.service';
import { LocalUtilService } from './local/system/service/local-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ionic angular core app';

  constructor(
    private utilService:LocalUtilService,
  ) {
    console.log(`creating: ${this.constructor.name}`);
  }

  ngOnInit() { }
}
