import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTypeSelectComponent } from './screen-type-select.component';

describe('ScreenTypeSelectComponent', () => {
  let component: ScreenTypeSelectComponent;
  let fixture: ComponentFixture<ScreenTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
