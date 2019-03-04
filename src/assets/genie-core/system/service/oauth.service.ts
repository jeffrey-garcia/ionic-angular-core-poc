import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, tap, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SharedService } from './shared.service';
import { ConfigFactory } from '../system-config';

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
  public getAppInfo(appHeaders?:any): Observable<any> {
    let _headers:any = {};
    if (appHeaders) {
      _headers['CMP-User-Data'] = JSON.stringify(appHeaders);
    }

    if (!ConfigFactory.getMobileApi().hasOwnProperty("appInfo")) {
      throw new Error(`mobile api: appInfo is not defined in environment!`);
    } else {
      let appInfo = ConfigFactory.getMobileApi()["appInfo"];
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
    if (!ConfigFactory.getMobileApi().hasOwnProperty("pushDeviceInfo")) {
      throw new Error(`mobile api: pushDeviceInfo is not defined in environment!`);
    } else {
      let pushDeviceInfo = ConfigFactory.getMobileApi()["pushDeviceInfo"]
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
    if (!ConfigFactory.getMobileApi().hasOwnProperty("registerPush")) {
      throw new Error(`mobile api: registerPush is not defined in environment!`);
    } else {
      let registerPush = ConfigFactory.getMobileApi()["registerPush"];
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
  }

  /**
   * Un-register PCF Push Notification Service
   */
  public unregisterPushService():Observable<any> {
    let device_uuid = this.pushDevice.getDeviceUuid()
    if (device_uuid==null || device_uuid=="") {
      return ErrorObservable.create("device_uuid is empty");
    } else {
      if (!ConfigFactory.getMobileApi().hasOwnProperty("registerPush")) {
        throw new Error(`mobile api: registerPush is not defined in environment!`);
      } else {
        let registerPush = ConfigFactory.getMobileApi()["registerPush"];
        return this.http.delete<any>(
          `${registerPush}/${device_uuid}`
        )
      }
    }
  }

  /**
   * Fetch received push notification from device
   */
  public fetchNotifications(): Observable<any> {
    if (!ConfigFactory.getMobileApi().hasOwnProperty("fetchNotifications")) {
      throw new Error(`mobile api: fetchNotifications is not defined in environment!`);
    } else {
      let fetchNotifications = ConfigFactory.getMobileApi()["fetchNotifications"];
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
  }  

  /**
   * Deprecated
   * Call Salesforce Login API
   */
  // login(): Observable<{}|IsCmpUserResponse>  {
  //   const loginAction = this.http.get(this.salesforceApi.login, {'responseType': 'text'})
  //   return loginAction.map(loginResponse => { 
  //     console.log(`[OAUTH_LOGIN]...`, loginResponse)
  //     return { "message":loginResponse }
  //   }).pipe(
  //     mergeMap(response => 
  //       this.isCmpUser().map(isCMPUserResponse => { 
  //         return [response,isCMPUserResponse] // combine login and isCMPUser response
  //       })
  //     ),
  //     tap(resp => {
  //       console.log('[LOGIN_COMPLETE]')
  //       this.sharedService.loginComplete = true; 
  //     }),
  //     catchError(this.handleError('login', {}))
  //   )
  // }

  public login_v2():Observable<boolean> {
    // align the login routine for both iOS and Android
    if (!ConfigFactory.getSalesforceApi().hasOwnProperty("login")) {
      throw new Error(`salesforce api: login is not defined in environment!`);
    } else {
      let salesforceApi = ConfigFactory.getSalesforceApi()["login"]
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
  }

  public loginCompleteCallback():void {
    // callback JS fired from native app's webview when login process completed
    console.log('login complete callback')
    this.$loginComplete.next(true)
  }  

  /**
   * Deprecated
   * Call Salesforce Logout API
   */
  // logout():Observable<any> {
  //   // Marketing Leads [starts] CMP-2799
  //   // use javascript closure for embedded logout execution upon success/failure push registration
  //   const _oauthService = this
  //   const executeLogout = (function(observer) {
  //     // align the login routine for both iOS and Android
  //     _oauthService.logout_v2().pipe(
  //       tap(
  //         (response) => {
  //           console.log(`logout successful: ${response}`)
  //           observer.next(response)
  //           observer.complete()
  //         },
  //         (error) => {
  //           observer.error(error)
  //           observer.complete()
  //         }
  //       ),
  //       catchError(_oauthService.handleError('logout', {}))
  //     ).subscribe()
  //   })

  //   // trigger the un-register API to backend when user click logout but BEFORE the logout API is passed to iOS
  //   // we don't care about the result of the un-register API (no matter is declined or error) we still need proceed the logout
  //   // the sequence does matter because we always need to finish the un-register API before we trigger logout
  //   // the un-register URL must be externalized into the environment file
  //   return Observable.create(
  //     (observer) => {
  //       this.unregisterPushService()
  //       .subscribe(
  //         (respone) => {
  //           console.log("unregister push success")
  //           executeLogout(observer)
  //         },
  //         (error) => {
  //           console.log(`failed to un-register push: ${error}`)
  //           executeLogout(observer)
  //         }
  //       )
  //     }
  //   )
  //   // Marketing Leads [ends] CMP-2799
  // }

  public logout_v2():Observable<any> {
    // align the login routine for both iOS and Android

    if (!ConfigFactory.getSalesforceApi().hasOwnProperty("logout")) {
      throw new Error(`salesforce api: logout is not defined in environment!`);
    } else {
      let logout = ConfigFactory.getSalesforceApi()["logout"];
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
    if (!ConfigFactory.getMobileApi().hasOwnProperty("clearUserSession")) {
      throw new Error(`mobile api: clearUserSession is not defined in environment!`);
    } else {
      let clearUserSession = ConfigFactory.getMobileApi()["clearUserSession"];
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
