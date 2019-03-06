import { Component, NgZone } from '@angular/core';

import { Events } from 'ionic-angular';

import { TranslateService } from "@ngx-translate/core";

import { 
  SharedService, 
  OauthService, 
  UtilService 
} from '../assets/genie-core/system/system.module';

import { LocalSharedService } from './local/system/service/local-shared.service';
import { LocalOauthService } from './local/system/service/local-oauth.service';
import { LocalUtilService } from './local/system/service/local-util.service';

import { AppPublishEvents } from '../assets/genie-core/app/app-ui.module';
import { LoginComponent } from '../assets/genie-core/feature/authentication/login/login.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rootPage: any;

  constructor(
    private sharedService:SharedService,
    private oauthService:OauthService,
    private utilService:UtilService,
    private localSharedService:LocalSharedService,
    private localOauthService:LocalOauthService,
    private localUtilService:LocalUtilService,
    private translate: TranslateService,
    private events : Events,
    private ngZone: NgZone
  ) {
    console.log(`creating: ${this.constructor.name}`);
  }

  ngOnInit() { 
    this.translate.use(this.sharedService.locale);

    this.events.subscribe(AppPublishEvents.APP_CHANGE_ROOT,(root?:any) => {
      this.ngZone.run(()=>{
        this.setRootPage(root ? root : HomeComponent);
      });
    });

    this.events.publish(AppPublishEvents.APP_CHANGE_ROOT, LoginComponent);
  }

  setRootPage(rootPage:any) {
    this.rootPage = rootPage;
  }
}
