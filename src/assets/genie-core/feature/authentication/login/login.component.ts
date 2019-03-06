import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Events } from 'ionic-angular';

import { forkJoin } from 'rxjs/observable/forkJoin';

import { SharedService, OauthService, UtilService } from '../../../system/system.module';
import { AppPublishEvents } from '../../../app/model/app.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * LoginComponent Constructor for injectable services
   *
   *
   * @param oauthService
   * @param sharedService
   */
  constructor(
    protected oauthService: OauthService,
    protected sharedService: SharedService,
    protected events: Events,
    protected utilService: UtilService,
    protected viewContainer: ViewContainerRef
  ) {
    console.log(`creating: ${this.constructor.name}`);
  }

  /**
   * Method for the onInit event of the component
   */
  ngOnInit() {
    // align the login routine for both iOS and Android
    this.doLogin_v2();
  }

  protected doLogin_v2() {
    console.log(`doLogin_v2`)

    // align the login routine for both iOS and Android
    this.oauthService.login_v2().subscribe(
      (response: any) => {
        // core handling
        const getUserAndAppInfo =  forkJoin([this.oauthService.getUserInfo(),this.oauthService.getAppInfo()])
        getUserAndAppInfo.subscribe(resp => {
            this.loginComplete()
        })
      }
    )
  }  

  protected loginComplete() {
    this.events.publish(AppPublishEvents.APP_CHANGE_ROOT);
  }

}
