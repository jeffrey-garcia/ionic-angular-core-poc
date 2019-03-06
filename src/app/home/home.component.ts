import { Component, OnInit } from '@angular/core';

import { TranslateService } from "@ngx-translate/core";

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Core Ionic Angular App';

  constructor(
    private translate: TranslateService,
  ) { 
    console.log(`creating: ${this.constructor.name}`);
  }

  ngOnInit() {
  }

  getMonthName(): any {
    let monthName = moment(new Date().toISOString()).format('MMMM');
    return { month: monthName };;
  }

}
