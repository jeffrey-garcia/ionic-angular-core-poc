import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs/Observable';

import { OauthService } from '../../../../assets/genie-core/system/system.module';

import { LocalSharedService } from './local-shared.service';

@Injectable()
export class LocalOauthService extends OauthService {

  constructor(
    protected http: HttpClient,
    protected sharedService: LocalSharedService,
    protected snackBar: MatSnackBar,
    protected deviceService: DeviceDetectorService
  ) { 
    super(http, sharedService, snackBar, deviceService);
  }

  /**
   * Call Salesforce UserInfo API
   */
  public getUserInfo(): Observable<any> {
    return Observable.of({});
  }

  /**
   * Determines if the user have access to CMP
   */
  public isCmpUser(): Observable<any> {
    return Observable.of(true);
  }

}
