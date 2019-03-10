import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, tap, mergeMap, delay } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SharedService } from './shared.service';
import { ConfigFactory } from '../config/system-config.model';

@Injectable()
export class OauthService {

  protected $loginComplete = new BehaviorSubject<boolean>(false)
  protected $logoutComplete = new BehaviorSubject<boolean>(false)

  constructor(
    protected http: HttpClient,
    protected sharedService: SharedService,
    protected snackBar: MatSnackBar,
    protected deviceService: DeviceDetectorService
  ) {
    console.log(`creating: ${this.constructor.name}`);
  }

  /**
   * Call Mobile AppInfo API
   */
  protected getAppInfo_stub(): Observable<any> {
    // simulate stub get app info
    return Observable.of({}).pipe(delay(500));
  }
  public getAppInfo(appHeaders?:any): Observable<any> {
    if (this.sharedService.environmentIsWeb()) {
      return this.getAppInfo_stub();
    }

    let _headers:any = {};
    if (appHeaders) {
      _headers['CMP-User-Data'] = JSON.stringify(appHeaders);
    }

    let appInfo = ConfigFactory.getEnvironment().mobile.appInfo;
    return this.http.get<any>(appInfo,
      { headers: _headers })
      .pipe(
        tap((resp: any) => {
          resp['termsAccepted'] = Boolean(resp['termsAccepted']);
          console.log('[OAUTH_APP_INFO]', resp);
          this.sharedService.appInfo = resp;
        }),
        catchError(this.handleError('getAppInfo', {}))
    );
  }

  /**
   * Call Salesforce UserInfo API
   */
  public getUserInfo(): Observable<any> {
    throw new Error("stub not implemented!");
  }

  /**
   * Determines if the user have access to CMP
   */
  public isCmpUser(): Observable<any> {
    throw new Error("stub not implemented!");
  }

  /**
   * Get Push Device Info
   */
  public getPushDeviceInfo(): Observable<any> {
    let pushDeviceInfo = ConfigFactory.getEnvironment().mobile.pushDeviceInfo
    return this.http.get<any>(
      pushDeviceInfo
    ).pipe(
      tap(
        (response) => {
          console.log("getPushDeviceInfo: " + JSON.stringify(response));
        }
      )
    );
  }  

  // Marketing Leads [starts] CMP-3058
  protected pushDevice = (function() {
    var _deviceUuid:string = "";
    return {
      setDeviceUuid: function(deviceUuid:string) {
        _deviceUuid = deviceUuid;
      },
      getDeviceUuid: function() {
        return _deviceUuid;
      }
    }
  })();
  // Marketing Leads [ends] CMP-3058

  /**
   * Register PCF Push Notification Service
   */
  public registerPushService(pushDeviceInfo:any): Observable<any> {
    let registerPush = ConfigFactory.getEnvironment().salesforce.registerPush;
    return this.http.post<any>(
      registerPush,
      pushDeviceInfo
    ).pipe(
      tap(
        (registerPushResponse) => {
          if (registerPushResponse != null && registerPushResponse.hasOwnProperty("device_uuid") != null) {
            console.log("register push success: " + JSON.stringify(registerPushResponse))
            let device_uuid = registerPushResponse["device_uuid"]
            this.pushDevice.setDeviceUuid(device_uuid)
          } else {
            console.log(`invalid response: ${registerPushResponse}`)
          }
        }
      ),
      catchError(this.handleError('registerPushService', {}))
    );
  }

  /**
   * Un-register PCF Push Notification Service
   */
  public unregisterPushService():Observable<any> {
    let device_uuid = this.pushDevice.getDeviceUuid()
    if (device_uuid==null || device_uuid=="") {
      return ErrorObservable.create("device_uuid is empty");
    } else {
      let registerPush = ConfigFactory.getEnvironment().salesforce.registerPush;
      return this.http.delete<any>(
        `${registerPush}/${device_uuid}`
      )
    }
  }

  /**
   * Fetch received push notification from device
   */
  public fetchNotifications(): Observable<any> {
    let fetchNotifications = ConfigFactory.getEnvironment().mobile.fetchNotifications;
    return this.http.get<any>(fetchNotifications,
      { headers: {'defaultAction':'window.ngAppComponent.remoteNotificationReceived();'} }
    )
    .pipe(
      tap((response: any) => {
        console.log("fetchNotifications: " + JSON.stringify(response));
      }),
      catchError(this.handleError('fetchNotifications', {}))
    );
  }  

  /**
   * Call Salesforce Login API
   */
  public login_v2_stub():Observable<boolean> {
    return Observable.of(true).pipe(delay(3000));
  }

  public login_v2():Observable<boolean> {
    if (this.sharedService.environmentIsWeb()) {
      return this.login_v2_stub();
    }

    // align the login routine for both iOS and Android
    let salesforceApi = ConfigFactory.getEnvironment().salesforce.login;
    this.http.get(salesforceApi,
      {
        headers: {'defaultAction':'window.ngAppComponent.loginCompleteCallback'},
        responseType: 'text'
      }
    )
    .pipe(
      tap((response: any) => {
        console.log(`can login invoked? ${response}`)
      }),
      catchError(this.handleError('login_v2', {}))
    ).subscribe()

    return Observable.create(
      (observer:any) => {
        this.$loginComplete.subscribe(
          (loginComplete:boolean) => {
            if (loginComplete == true) {
              this.$loginComplete.next(false)
              observer.next(loginComplete)
              observer.complete()
            }
          },
          (error) => {
            this.$loginComplete.next(false)
            observer.error(`fail to invoke login: ${error}`)
          }
        )
      }
    )
  }

  public loginCompleteCallback():void {
    // callback JS fired from native app's webview when login process completed
    console.log('login complete callback')
    this.$loginComplete.next(true)
  }  

  /**
   * Call Salesforce Logout API
   */
  public logout_v2():Observable<any> {
    // align the login routine for both iOS and Android

    let logout = ConfigFactory.getEnvironment().salesforce.logout;
    this.http.get(logout, 
      { 
        headers: {'defaultAction':'window.ngAppComponent.logoutCompleteCallback'},
        responseType: 'text'
      }
    ).pipe(
      tap(
        (response) => {
          console.log(`can logout invoked? ${response}`);
        }
      ),
      catchError(this.handleError('logout', {}))
    ).subscribe()

    return Observable.create(
      (observer:any) => {
        this.$logoutComplete.subscribe(
          (logoutComplete:boolean) => {
            if (logoutComplete == true) {
              this.sharedService.logoutComplete = true; // TODO: do we still need this global flag?
              this.$logoutComplete.next(false)
              observer.next(logoutComplete)
              observer.complete()
            }
          },
          (error) => {
            this.$logoutComplete.next(false)
            observer.error(`fail to invoke logout: ${error}`)
          }
        )
      }
    )
  }

  public logoutCompleteCallback():void {
    // callback JS fired from native app's webview when login process completed
    console.log('logout complete callback')
    this.$logoutComplete.next(true)
  }

  /**
   * Local service for revoking the salesforce session of the currently logged in user
   */
  public clearUserSession(): Observable<string> {
    let clearUserSession = ConfigFactory.getEnvironment().mobile.clearUserSession;
    return this.http.get<any>(clearUserSession)
    .pipe(
      tap(
        (resp: any) => {
          console.log('[CLEAR_USER_SESSION]', resp);
        }
      ),
      catchError(this.handleError('clearUserSession'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.snackBar.open(`${operation} failed: ${error.status}`, '', {
        duration: 5000
      });

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
