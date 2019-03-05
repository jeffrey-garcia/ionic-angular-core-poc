import { Component } from '@angular/core';

import { 
  SharedService, 
  OauthService, 
  UtilService 
} from '../assets/genie-core/system/system.module';

import { LocalSharedService } from './local/system/service/local-shared.service';
import { LocalOauthService } from './local/system/service/local-oauth.service';
import { LocalUtilService } from './local/system/service/local-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Core Ionic Angular App';

  constructor(
    private sharedService:SharedService,
    private oauthService:OauthService,
    private utilService:UtilService,
    private localSharedService:LocalSharedService,
    private localOauthService:LocalOauthService,
    private localUtilService:LocalUtilService,
  ) {
    console.log(`creating: ${this.constructor.name}`);
  }

  ngOnInit() { }
}
