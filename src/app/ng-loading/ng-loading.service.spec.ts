import { TestBed, inject } from '@angular/core/testing';

import { NgLoadingService } from './ng-loading.service';

describe('NgLoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgLoadingService]
    });
  });

  it('should be created', inject([NgLoadingService], (service: NgLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
