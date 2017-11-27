import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioSpinnersComponent } from './riccio-spinners.component';

describe('RiccioSpinnersComponent', () => {
  let component: RiccioSpinnersComponent;
  let fixture: ComponentFixture<RiccioSpinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioSpinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioSpinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
