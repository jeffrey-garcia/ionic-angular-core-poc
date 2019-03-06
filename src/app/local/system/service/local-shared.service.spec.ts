import { TestBed, inject } from '@angular/core/testing';

import { LocalSharedService } from './local-shared.service';

describe('LocalSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalSharedService]
    });
  });

  it('should be created', inject([LocalSharedService], (service: LocalSharedService) => {
    expect(service).toBeTruthy();
  }));
});
