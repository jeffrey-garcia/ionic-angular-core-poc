import { Component } from '@angular/core';

import { 
  SharedService, 
  OauthService, 
  UtilService 
} from '../assets/genie-core/system/system.module';

import { LocalOauthService } from './local/system/service/local-oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private sharedService:SharedService,
    private oauthService:LocalOauthService,
    private utilService:UtilService,
  ) {
    console.log(`creating: ${this.constructor.name}`);
  }

  ngOnInit() {

    // test oauth service call
    this.oauthService.getUserInfo().subscribe(
      (response:any) => {
        console.log(`result: ${JSON.stringify(response)}`);
      }
    );

  }
}
