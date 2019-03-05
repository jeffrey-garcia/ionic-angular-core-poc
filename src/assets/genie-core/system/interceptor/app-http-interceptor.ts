import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpClient} from '@angular/common/http';

import { Events } from 'ionic-angular';
import { AppPublishEvents } from '../../app/model/app.enum';
import 'rxjs/add/operator/do';

import { WindowRef } from '../scripts/WindowRef';
import { DeviceDetectorService, DEVICES } from 'ngx-device-detector';
import { ConfigFactory } from '../system-config';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
	constructor(
		private httpClient: HttpClient,
		private events: Events,
		private windowRef: WindowRef,
		private deviceService: DeviceDetectorService
	) { }

	private _triggerLogout = false;
	/**
	 * interface method from HttpInterceptor
	 *
	 * @param req
	 * @param next
	 */
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		if (this.deviceService.getDeviceInfo().device == DEVICES.ANDROID &&
			req.method.toLowerCase() != 'get') {
			console.log(`intercepting request method: ${req.method}, body: ${req.body}`);
			req = req.clone({
				setHeaders: {
					'getDataJs': 'window.coreHybridApp.getRequestBodyData'
				}
			  });
			  if (req.body == null) {
				this.windowRef.nativeWindow.coreHybridApp.setRequestBodyData({});
			  } else {
				this.windowRef.nativeWindow.coreHybridApp.setRequestBodyData(req.body);
			  }
			  req.headers.append('getDataJs', 'window.coreHybridApp.getRequestBodyData');
		}

		this._triggerLogout = true;
		return next.handle(req).do(
			(event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					// intercept the incoming response from remote host
				}
			},
			(err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 403 || err.status === 401) {
						// publish logout event
						this.events.publish(AppPublishEvents.APP_WILL_LOGOUT, null);

						if (!ConfigFactory.getSalesforceApi().hasOwnProperty("logout")) {
							throw new Error(`salesforce api: logout is not defined in environment!`);
						} else {
							let logout = ConfigFactory.getSalesforceApi()["logout"];

							// fire a logout api to complete the session timeout scenario
							// don't care about the logout complete callback, just fire event to redirect to login page
							this.httpClient.get(logout,
								{ responseType: 'text' }
							).subscribe(
								(resp) => {
									console.log('logout successful: ', resp);
									this.events.publish(AppPublishEvents.APP_CHANGE_ROOT, null);
								},
								(error) => {
									console.log('logout error: ', error);
									this.events.publish(AppPublishEvents.APP_CHANGE_ROOT, null);
								}
							);
						}
					}
				}
			}
		);
	}
}
