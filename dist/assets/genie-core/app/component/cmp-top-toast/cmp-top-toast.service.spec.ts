import { TestBed, inject } from '@angular/core/testing';

import { CmpTopToastService } from './cmp-top-toast.service';

describe('CmpTopToastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmpTopToastService]
    });
  });

  it('should be created', inject([CmpTopToastService], (service: CmpTopToastService) => {
    expect(service).toBeTruthy();
  }));
});
