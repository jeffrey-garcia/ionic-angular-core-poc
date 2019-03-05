import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DateAdapter } from "@angular/material/core";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as moment from 'moment';

import { Locale, getSupportedLocaleByCountryCode, getDefaultLocaleByCountryCode } from "../locale/supported-locale.model";
import { ConfigFactory } from "../system-config";

export class Months {
    names?: Array<string>;
    shortNames?: Array<string>;
    constructor(_names?: Array<string>, _shortNames?: Array<string>) {
        this.names = _names==null ? new Array<string>():_names;
        this.shortNames = _shortNames==null? new Array<string>():_shortNames;
    }
}

@Injectable()
export class SharedService {
  protected _activity?: string = undefined;
  protected _componentFullScreen: boolean = false;
  protected _prevURL?: string;
  protected _currentURL?: string;
  protected _searchFilter: string = "";
  protected _inputActive: boolean = false;
  
  protected _loginComplete: boolean = false;
  protected _logoutComplete: boolean = false;
  protected _pendingHideToolbar = false;
  protected _locale: string = getDefaultLocaleByCountryCode(ConfigFactory.getCountryCode());
  
  protected _menuSideNav: boolean = true;
  protected _isDynamicHeader : boolean = false;
  protected _userInfo = new Subject<any>();
  protected _appInfo = new Object();
  protected _userInfoData?: any;
  protected currenUserId = '';
  protected _fullname: string = '';
  protected userInfoList = new Array();
  
  protected _months: Months = new Months(moment.months(),moment.monthsShort());
  protected monthsBehavior = new BehaviorSubject<Months>(this._months);
  protected monthsChange = this.monthsBehavior.asObservable();

  protected _initialPage : string = '';
  protected _nextTabPage: string = '';

  protected messageSource = new BehaviorSubject('default message');
  protected currentMessage = this.messageSource.asObservable();

  constructor(
    protected translate: TranslateService,
    protected adapter: DateAdapter<any>,    
  ) {
    console.log(`creating: ${this.constructor.name}`);
  }

  set activity(activity: string|undefined) {
    console.log(`New activity: ${activity}`);
    // Prevent ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(function(this:SharedService) {
        this._activity = activity;
    }, 0);
  }

  get activity(): string|undefined {
      return this._activity;
  }

  set componentFullScreen(fullscreen: boolean) {
    this._componentFullScreen = fullscreen;
  }

  get componentFullScreen(): boolean {
      return this._componentFullScreen;
  }

  set pendingHideToolbar(pendingHideToolbar: boolean) {
      this._pendingHideToolbar = pendingHideToolbar;
  }

  get pendingHideToolbar(): boolean {
      return this._pendingHideToolbar;
  }  

  set prevURL(url: string|undefined) {
      this._prevURL = url;
  }

  get prevURL(): string|undefined {
      return this._prevURL;
  }

  set currentURL(url: string|undefined) {
      this._currentURL = url;
  }

  get currentURL(): string|undefined {
      return this._currentURL;
  }  

  set searchFilter(searchFilter: string) {
      this._searchFilter = searchFilter;
  }

  get searchFilter(): string {
      return this._searchFilter;
  }  

  set inputActive(inputActive: boolean) {
      this._inputActive = inputActive;
  }

  get inputActive(): boolean {
      return this._inputActive;
  }  

  set locale(locale: string) {
      this.translate.use(locale);
      this.adapter.setLocale(locale);
      this.setMomentLocale(locale);
      this._locale = locale;
  }

  get locale(): string {
      return this._locale;
  }

  set loginComplete(loginComplete: boolean) {
      this._loginComplete = loginComplete;
  }

  get loginComplete(): boolean {
      return this._loginComplete;
  }

  set logoutComplete(logoutComplete: boolean) {
      this._logoutComplete = logoutComplete;
  }

  get logoutComplete(): boolean {
      return this._logoutComplete;
  }  

  set isDynamicHeader(isDynamicHeader : boolean) {
      this._isDynamicHeader = isDynamicHeader;
  }

  get isDynamicHeader(): boolean {
      return this._isDynamicHeader;
  }

  get userInfo(): Observable<object> {
      return this._userInfo.asObservable();
  }

  set userInfo(user) {
      this._userInfo.next(user);
  }

  clearUserInfo() {
      this._userInfo.next();
  }

  set currentUserId(userId) {
      this.currenUserId = userId;
  }

  get currentUserId() {
      return this.currenUserId;
  }

  set userInfoLists(userInfo:any) {
      this.userInfoList.push(userInfo);
  }

  getUserInfoByUserId(userId:string): any {
      return this.userInfoList.find(user => user.user_id === userId);
  }

  set showMenuSideNav(enable: boolean) {
      this._menuSideNav = enable;
  }

  get showMenuSideNav(): boolean {
      return this._menuSideNav;
  }

  set initialPage(initialPage : string) {
      this._initialPage = initialPage;
  }

  get initialPage(): string {
      return this._initialPage;
  }

  set nextTabPage(nextTabPage: string) {
      this._nextTabPage = nextTabPage;
  }

  get nextTabPage(): string {
      return this._nextTabPage;
  }

  set appInfo(appInfo: any) {
      this._appInfo = appInfo;
  }

  get appInfo(): any {
      return this._appInfo;
  }

  set userInfoData(userInfoData : any) {
      this._userInfoData = userInfoData;
  }

  get userInfoData(): any {
      return this._userInfoData;
  }

  get months(): Months {
      return this._months;
  }

  get nextYear(): number {
      return new Date().getFullYear() + 1;
  }

  get divisions() {
      throw new Error("stub not implemented!");
  }

  public getDivisionByType(typename:string): any[] {
      throw new Error("stub not implemented!");
  }

  /**
   * returns concatenated lead's firstname and lead's lastname 
   * @param lead 
   */
  public getFullName(lead:any): string {
      if (lead.firstName) {
          this._fullname = lead.firstName + ' ' + lead.lastName;
      } else {
          this._fullname = lead.lastName;
      }
      return this._fullname;
  }

  /**
   * moment: Load capitalize month names from moment.
   * @param locale 
   */
  protected setMomentLocale(locale:string) {
    moment.locale(locale);
    this.monthsBehavior.next(new Months(
      moment.localeData(locale).months(),
      moment.localeData(locale).monthsShort()
    ));
  }
  
  public environmentIsWeb(): boolean {
      let envName = ConfigFactory.getEnvironmentName();
      if (envName == null) {
          throw new Error(`environment name is not configured!`);
      } else {
        return envName.toLowerCase().indexOf("web") > -1
      }
  }

}
