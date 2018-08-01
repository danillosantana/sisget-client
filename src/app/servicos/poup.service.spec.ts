import { TestBed, inject } from '@angular/core/testing';

import { PoupService } from './poup.service';

describe('PoupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoupService]
    });
  });

  it('should be created', inject([PoupService], (service: PoupService) => {
    expect(service).toBeTruthy();
  }));
});
