import { TestBed, inject } from '@angular/core/testing';

import { GrMoreService } from './gr-more.service';

describe('GrMoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrMoreService]
    });
  });

  it('should be created', inject([GrMoreService], (service: GrMoreService) => {
    expect(service).toBeTruthy();
  }));
});
