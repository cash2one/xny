import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTypeHeaderComponent } from './screen-type-header.component';

describe('ScreenTypeHeaderComponent', () => {
  let component: ScreenTypeHeaderComponent;
  let fixture: ComponentFixture<ScreenTypeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenTypeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenTypeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
