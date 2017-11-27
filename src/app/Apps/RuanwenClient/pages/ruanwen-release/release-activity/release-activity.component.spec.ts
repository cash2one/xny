import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseActivityComponent } from './release-activity.component';

describe('ReleaseActivityComponent', () => {
  let component: ReleaseActivityComponent;
  let fixture: ComponentFixture<ReleaseActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
