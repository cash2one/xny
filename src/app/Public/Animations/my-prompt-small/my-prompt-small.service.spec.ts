import { TestBed, inject } from '@angular/core/testing';

import { MyPromptSmallService } from './my-prompt-small.service';

describe('MyPromptSmallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyPromptSmallService]
    });
  });

  it('should ...', inject([MyPromptSmallService], (service: MyPromptSmallService) => {
    expect(service).toBeTruthy();
  }));
});
