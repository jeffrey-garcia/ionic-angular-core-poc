import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { DateAdapter } from "@angular/material/core";

import * as moment from 'moment';

import { SharedService } from '../../../../assets/genie-core/system/service/shared.service';
import { Months } from '../../../../assets/genie-core/system/service/shared.service';

import * as divisions from '../data/address.json';

@Injectable()
export class LocalSharedService extends SharedService {

  protected _divisions : any = (<any>divisions);

  constructor(
    protected translate: TranslateService,
    protected adapter: DateAdapter<any>,    
  ) {
    super(translate, adapter);
  }

  public get divisions() {
      return this._divisions;
  }

  public getDivisionByType(typename:string): any[] {
      if (!this._divisions.hasOwnProperty(typename)) return [];
      return this._divisions[typename];
  }

  /**
   * moment: Load capitalize month names from moment.
   * @param locale 
   */
  protected setMomentLocale(locale:string) {
        // override core for local settings
        moment.locale(locale);
        this.monthsBehavior.next(new Months(
        moment.localeData(locale).months(),
        moment.localeData(locale).monthsShort()
    ));
  }
}

export class Province {
	value?: string;
	display?: string;
}
export class District {
	provinceId?: string;
	value?: string;
	display?: string;
}
export class Ward {
	provinceId?: string;
	districtId?: string;
	value?: string;
	display?: string;
}

export class ContactDivision {
	province: Province = new Province();
	district: District = new District();
    ward: Ward = new Ward();
    constructor(
        _province?: Province,
        _district?: District,
        _ward?: Ward,
    ) {
        if (_province) {
            this.province = _province;
            if (_district) {
                this.district = _district;
                if (_ward)  this.ward = _ward;
            }
        }
        
    }
}