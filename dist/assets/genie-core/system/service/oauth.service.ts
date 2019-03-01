import { Injectable } from '@angular/core';

@Injectable()
export class OauthService {

  constructor() {
    console.log(`creating: ${this.constructor.name}`);
  }

}
