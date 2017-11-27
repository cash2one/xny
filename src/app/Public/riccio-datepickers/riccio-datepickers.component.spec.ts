import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioDatepickersComponent } from './riccio-datepickers.component';

describe('RiccioDatepickersComponent', () => {
  let component: RiccioDatepickersComponent;
  let fixture: ComponentFixture<RiccioDatepickersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioDatepickersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioDatepickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
