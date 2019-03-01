import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() {
    console.log(`creating: ${this.constructor.name}`);
  }

}
