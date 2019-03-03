import { Injectable, NgModuleFactoryLoader, NgModuleFactory, Injector, ViewContainerRef, Type } from '@angular/core';
import { Router } from '@angular/router';

import { App, Content, NavController, Nav, ModalController, ToastController, Events, ActionSheetOptions, ActionSheetController } from 'ionic-angular';

import { Location, DatePipe } from '@angular/common';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { SharedService } from './shared.service';
import { OauthService } from './oauth.service';

import { AppPublishEvents } from '../app.enum';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UtilService {

  constructor(
    private app: App,
    private router: Router,
    private location: Location,
    private events: Events,
    private deviceService: DeviceDetectorService,
    private sharedService: SharedService,
    private oauthService: OauthService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private moduleLoader: NgModuleFactoryLoader,
    private injector: Injector
  ) {
    console.log(`creating: ${this.constructor.name}`)
  }

  /**
   * Add Zero to number < 10
   * @param number 
   */
  addZeroes(number:number): string {
    return number < 10 ? "0" + number : `${number}`;
  }

  canGoBack(): boolean {
    return this.router.url.split("/").length > 2;
  }

  loadLazyGenericsComponentFactory = function() {
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

  private lazyLoadModule(
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
}