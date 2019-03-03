import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { SharedService } from './shared.service';

@Injectable()
export class OauthService {

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
  ) {
    console.log(`creating: ${this.constructor.name}`);
  }

}
