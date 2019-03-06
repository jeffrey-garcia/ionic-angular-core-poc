import { Injectable, NgModuleFactoryLoader, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { App, ModalController, ToastController, Events, ActionSheetController } from 'ionic-angular';

import { Location } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

import { UtilService } from '../../../../assets/genie-core/system/service/util.service';

import { LocalSharedService } from './local-shared.service';
import { LocalOauthService } from './local-oauth.service';

@Injectable()
export class LocalUtilService extends UtilService {

  constructor(
    protected app: App,
    protected router: Router,
    protected location: Location,
    protected events: Events,
    protected deviceService: DeviceDetectorService,
    protected sharedService: LocalSharedService,
    protected oauthService: LocalOauthService,
    protected modalCtrl: ModalController,
    protected actionSheetCtrl: ActionSheetController,
    protected toastCtrl: ToastController,
    protected moduleLoader: NgModuleFactoryLoader,
    protected injector: Injector    
  ) { 
    super(
      app,
      router,
      location,
      events,
      deviceService,
      sharedService,
      oauthService,
      modalCtrl,
      actionSheetCtrl,
      toastCtrl,
      moduleLoader,
      injector
    );
  }

}
