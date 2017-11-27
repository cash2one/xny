import { TestBed, inject } from '@angular/core/testing';

import { MyLoadingService } from './my-loading.service';

describe('MyLoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyLoadingService]
    });
  });

  it('should ...', inject([MyLoadingService], (service: MyLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
