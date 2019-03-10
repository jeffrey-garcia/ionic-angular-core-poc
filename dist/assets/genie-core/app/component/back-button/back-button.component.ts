import { Component, Input } from '@angular/core';

import { UtilService } from '../../../system/service/util.service';
import { SharedService } from '../../../system/service/shared.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent {
  @Input() popPage?: boolean;

  constructor(
    public sharedService: SharedService,
    private utilService: UtilService
  ) { }

  onBackButtonClick() {
    if (this.popPage) {
      this.utilService.popPage();
    } else {
      this.utilService.onBackButton();
    }
  }



}
