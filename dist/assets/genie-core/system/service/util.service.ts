import { Injectable, NgModuleFactoryLoader, NgModuleFactory, Injector, ViewContainerRef, Type } from '@angular/core';
import { Router } from '@angular/router';

import { App, Content, NavController, Nav, ModalController, ToastController, Events, ActionSheetOptions, ActionSheetController } from 'ionic-angular';

import { Location, DatePipe } from '@angular/common';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { SharedService } from './shared.service';
import { OauthService } from './oauth.service';

import { AppPublishEvents } from '../../app/model/app.enum';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UtilService {

  public EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  protected tappedReceivedActivityId?:string;

  constructor(
    protected app: App,
    protected router: Router,
    protected location: Location,
    protected events: Events,
    protected deviceService: DeviceDetectorService,
    protected sharedService: SharedService,
    protected oauthService: OauthService,
    protected modalCtrl: ModalController,
    protected actionSheetCtrl: ActionSheetController,
    protected toastCtrl: ToastController,
    protected moduleLoader: NgModuleFactoryLoader,
    protected injector: Injector
  ) {
    console.log(`creating: ${this.constructor.name}`)
  }

  /**
   * Add Zero to number < 10
   * @param number 
   */
  public addZeroes(number:number): string {
      return number < 10 ? "0" + number : `${number}`;
  }

  public canGoBack(): boolean {
      return this.router.url.split("/").length > 2;
  }

  public onBackButton(): void {
      let currentUrl = this.router.url;
      let pageDepth: string[] = currentUrl.split("/");
      if (pageDepth && pageDepth.length > 2 && pageDepth[1]) {
          this.location.back();
      } else {
          console.log("cannot navigate back");
      }
  }

  public textToTranlationKey(str : string): string {
      return str.toUpperCase().replace(' ', '_');
  }

  public onDeviceInfo(): DeviceInfo {
      console.log('Device Info::', this.deviceService.getDeviceInfo());
      return this.deviceService.getDeviceInfo();
  }

  public fetchNotifications<T>(viewContainer:ViewContainerRef):void {
      console.log("fetch notifications from device...")

      // proceed to fetch all received notifications from iOS
      this.oauthService.fetchNotifications().subscribe(
        (fetchResult) => {
            
          // handle jfw notification
          this.processPushNotification(fetchResult);

          // handle digital leads notification
          // this.loadDigitalLeadsComponent(
          //   DigitalLeadsComponent,
          //   'app/digital-leads/digital-leads.module#DigitalLeadsModule',
          //   viewContainer,
          // );
          
          // handle digital leads notification
          // this.loadDigitalLeadsComponentFactory(viewContainer).pipe(take(1)).subscribe(
          //   (digitalLeadsComponent:DigitalLeadsComponent) => {
          //       console.log("digital leads component instance retrieved")
          //       digitalLeadsComponent.processPushNotification(fetchResult)
          //   },
          //   (error:any) => {
          //       console.log(`error: ${error}`)
          //   }
          // )        
        }
      )
  }

  /**
  * Handles push notification received by the app
  * @param fetchResult notifications
  */
  public processPushNotification(fetchResult: any) {
    if (fetchResult != null && fetchResult.deliveredNotifications != null) {
        let jfwNotificationReceived = false;
        const pushedNotificationMap = new Map(Object.entries(fetchResult.deliveredNotifications));
        if (pushedNotificationMap != null && pushedNotificationMap.size > 0) {
          const iterator = pushedNotificationMap.values();
          let result = iterator.next();
          while (!result.done) {
            const pushedNotification:any = result.value;
            console.log('process pushNotification', pushedNotification);

            // determine if there is a JFW notification
            if (pushedNotification['notificationType'] == 'jfw_manager_feedback' ||
                pushedNotification['notificationType'] == 'jfw_manager_feedback_requested') {
                jfwNotificationReceived = true;
                break;
            }

            result = iterator.next();
          }
        }

        if (jfwNotificationReceived) {
            this.events.publish(AppPublishEvents.APP_REMINDERS_REFRESH, { userId: this.sharedService.currentUserId });
        }
    }

    if (fetchResult != null && fetchResult.tappedNotification != null) {
        const tappedNotification = fetchResult.tappedNotification;
        const activityId = tappedNotification.activityId;

        if (activityId != null) {
            // pop to home tabs
            this.popToRootPage();

            // navigate to notifications tab with parameters
            this.events.publish(AppPublishEvents.APP_CHANGE_MAIN_TAB, 4);
            this.setTappedReceivedActivityId(activityId);
        }
    }
  }  

  public setTappedReceivedActivityId(activityId:string): void {
      this.tappedReceivedActivityId = activityId
  }

  public getTappedActivityId(): string|undefined {
      return this.tappedReceivedActivityId
  }

  public unsetTappedActivityId(): void {
      this.tappedReceivedActivityId = undefined;
  }

  public loadDigitalLeadsComponent<T>(type:new(...args:any[])=>T, path:string, viewContainer:ViewContainerRef): void {
    this.lazyLoadGenericsComponentFactory<T>(
      type, 
      viewContainer, 
      path
    ).pipe(take(1)).subscribe(
      (digitalLeadsComponent:T) => {
        console.log("digital leads component instance retrieved")
        // digitalLeadsComponent.processPushNotification(fetchResult)
      },
      (error:any) => {
          console.log(`error: ${error}`)
      }
    )
  }
  
  lazyLoadGenericsComponentFactory = function() {
    let lazyModulesMap = new Map<String, any>();
    
    return (function<T>(
      this:UtilService,
      type:new(...args:any[])=>T, 
      viewContainer:ViewContainerRef, 
      path:string
    ):Observable<T> {
      console.log("lazy initialization in progress ...");
      let $lazyComponent = new BehaviorSubject<any>(null);

      let lazyComponent:T = lazyModulesMap.get(type.name);
      if (lazyComponent == null) {
        this.lazyLoadModule(
          viewContainer,
          path,
          type
        ).subscribe(
          (lazyComponent:T) => {
            // saved to map
            lazyModulesMap.set(type.name, lazyComponent);
            console.log(`lazy module map size: ${lazyModulesMap.size}`);

            // perform the startup routine finish
            $lazyComponent.next(lazyComponent);
            $lazyComponent.complete();
          },
          (error:Error) => {
            console.error(`fail to initialize: ${error}`);
            $lazyComponent.error(new type());
            $lazyComponent.complete();
          }
        )

      } else {
        console.log(`component restored: ${lazyComponent.constructor.name}`);
        $lazyComponent.next(lazyComponent);
      }

      return Observable.create(
        (observer:any) => {
          try {
            $lazyComponent.subscribe(
              (lazyComponent:T) => {
                if (lazyComponent != null) {
                  // emit only if component value has been initialized
                  observer.next(lazyComponent);
                  observer.complete();
                }
              },
              (error:Error) => {
                observer.error(error);
                observer.complete();
              }
            )
          } catch (error) {
            observer.error(error);
            observer.complete();
          }
        }
      );
    })
  }();

  protected lazyLoadModule(
    viewContainer:ViewContainerRef,
    modulePath:string,
    entryComponentType:Type<any>
  ):Observable<any> {
    let targetComponent:any
    return Observable.create(
      (observer:any) => {
        console.log(`start lazying load module: ${modulePath}`)
        this.moduleLoader.load(modulePath).then(
          (moduleFactory: NgModuleFactory<any>) => {
            const moduleRef = moduleFactory.create(this.injector)
            const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponentType);
            let componentRef = viewContainer.createComponent(compFactory)
            console.log(`component loaded: ${componentRef.componentType.name}`)
            if (componentRef.componentType.name == entryComponentType.name) {
              targetComponent = componentRef.instance
              observer.next(targetComponent)
              observer.complete()
            } else {
              observer.error("component name un-match.")
            }
          }
        ).catch(
          (err) => {
            observer.error(`fail to instantiate component: ${entryComponentType.name} error: ${err.message}`)
          }
        )
      }
    )
  }

  public onDataSyncCompleted() {
      this.events.publish(AppPublishEvents.APP_DATA_SYNC_COMPLETED);
  }

  public openPopup(page: any, param: any = {}, onDidDismissHandler: (data:any) => void ) {
      // param
      const modalCtrl =  this.modalCtrl.create(page, param, {
          showBackdrop: true,
          enableBackdropDismiss: true,
          cssClass: "popup-has-backdrop",
          enterAnimation: 'modal-md-slide-in',
          leaveAnimation: 'modal-md-slide-out',
      });
      modalCtrl.onDidDismiss(data => {
          onDidDismissHandler(data);
      });
      modalCtrl.present();
  }

  public onAppResumedActive(){
      this.events.publish(AppPublishEvents.APP_RESUMED_ACTIVE);
  }

  public openPageModally(page: any, param: any = {}, onDidDismissHandler: (data:any) => void ) {
      const modalCtrl =  this.modalCtrl.create(page, param
          , {
          showBackdrop: true,
          enableBackdropDismiss: true,
          cssClass: "popup-has-backdrop-no-padding",
          enterAnimation: 'modal-md-slide-in',
          leaveAnimation: 'modal-md-slide-out',
      }
      );
      modalCtrl.onDidDismiss(data => {
          onDidDismissHandler(data);
      });

      modalCtrl.present();
  }

  public openPage(page: any, outsideTabsView: boolean = true, param: Object = {}): void {
      /* this will open the new page outside the tabs view */
      let navCtrlList = this.app.getRootNavs();

      if (outsideTabsView) {
          if (navCtrlList[0] != null) {
              navCtrlList[0].push(page, param, {animate: true, direction: 'forward'});
          }
      } else {
          const nav = this.app.getActiveNav();
          nav.push(page, param, {animate: true, direction: 'forward'});
      }
  }

  public popPage(): void {
      const navCtrlList = this.app.getRootNavs();

      if (navCtrlList[0] != null) {
          navCtrlList[0].pop();
      }
  }

  public popToRootPage(): void {
      const navCtrlList = this.app.getRootNavs();

      if (navCtrlList[0] != null) {
          navCtrlList[0].popToRoot();
      }
  }  


    /**
     * Pop multiple pages
     * @param pagesToPop number of pages to pop/close
     */
    public popPages(pagesToPop:number): void {
      const navCtrlList = this.app.getRootNavs();

      if (navCtrlList[0] != null) {
          navCtrlList[0].popTo(navCtrlList[0].getByIndex( (navCtrlList[0].length() - 1) - pagesToPop));
      }
    }

    public formatDateLocale(_date: Date, format: string): string|null {
        const localeDatePipe = new DatePipe(this.sharedService.locale);
        return localeDatePipe.transform(_date, format);
    }

  /**
   * Format date
   * @param date 
   * @param format 
   */
    public doFormatDate(date:any, format:any): string {
        return moment(date).format(format);
    }

    public toDate(date:any): Date {
        return moment(date).toDate();
    }

    public getDateToday(format:any): string {
        return moment().format(format);
    }

    /**
     * Email validator
     * @param email
     */
    public validEmailAddress(email: string): boolean {
        let validEmail: boolean = true;

        if (email) {
            validEmail = this.EMAIL_REGEX.test(email);
        }

        return validEmail;
    }

    /**
     * open IONIC Action Sheet 
     * @param actionsheetOpts
     */
    public presentActionSheet(actionsheetOpts: ActionSheetOptions) {
        let actionSheet = this.actionSheetCtrl.create(actionsheetOpts);
        actionSheet.present();
    }

    /**
     * check if IonContent is scrollable 
     * @param content
     */
    public isScrollable(content : Content): boolean {
        return content.getScrollElement().scrollHeight > content.getScrollElement().offsetHeight;
    }

    public nullToZero(num?:number):number {
        if (!num) {
          return 0;
        } else {
          return num;
        }
    }

}