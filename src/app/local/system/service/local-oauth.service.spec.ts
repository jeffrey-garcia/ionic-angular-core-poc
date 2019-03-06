import { TestBed, inject } from '@angular/core/testing';

import { LocalOauthService } from './local-oauth.service';

describe('LocalOauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalOauthService]
    });
  });

  it('should be created', inject([LocalOauthService], (service: LocalOauthService) => {
    expect(service).toBeTruthy();
  }));
});
