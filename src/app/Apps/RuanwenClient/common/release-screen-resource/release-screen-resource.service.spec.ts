import { TestBed, inject } from '@angular/core/testing';

import { ReleaseScreenResourceService } from './release-screen-resource.service';

describe('ReleaseScreenResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReleaseScreenResourceService]
    });
  });

  it('should ...', inject([ReleaseScreenResourceService], (service: ReleaseScreenResourceService) => {
    expect(service).toBeTruthy();
  }));
});
