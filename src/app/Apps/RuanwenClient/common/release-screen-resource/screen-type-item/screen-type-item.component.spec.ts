import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTypeItemComponent } from './screen-type-item.component';

describe('ScreenTypeItemComponent', () => {
  let component: ScreenTypeItemComponent;
  let fixture: ComponentFixture<ScreenTypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenTypeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
