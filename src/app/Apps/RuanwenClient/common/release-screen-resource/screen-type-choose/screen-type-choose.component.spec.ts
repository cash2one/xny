import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTypeChooseComponent } from './screen-type-choose.component';

describe('ScreenTypeChooseComponent', () => {
  let component: ScreenTypeChooseComponent;
  let fixture: ComponentFixture<ScreenTypeChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenTypeChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenTypeChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
