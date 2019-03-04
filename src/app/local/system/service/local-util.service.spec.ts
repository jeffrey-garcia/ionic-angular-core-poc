import { TestBed, inject } from '@angular/core/testing';

import { LocalUtilService } from './local-util.service';

describe('LocalUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalUtilService]
    });
  });

  it('should be created', inject([LocalUtilService], (service: LocalUtilService) => {
    expect(service).toBeTruthy();
  }));
});
