import { Injectable, NgModuleFactoryLoader, NgModuleFactory, Injector, ViewContainerRef, Type } from '@angular/core';
import { Router } from '@angular/router';

import { App, Content, NavController, Nav, ModalController, ToastController, Events, ActionSheetOptions, ActionSheetController } from 'ionic-angular';

import { Location, DatePipe } from '@angular/common';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { SharedService } from './shared.service';
import { OauthService } from './oauth.service';

import { AppPublishEvents } from '../app.enum';
import * as moment from 'moment';
// import { DigitalLeadsComponent } from '../../digital-leads/digital-leads.component';
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

}