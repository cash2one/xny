import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseCompleteComponent } from './release-complete.component';

describe('ReleaseCompleteComponent', () => {
  let component: ReleaseCompleteComponent;
  let fixture: ComponentFixture<ReleaseCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
