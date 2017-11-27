import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioModalComponent } from './riccio-modal.component';

describe('RiccioModalComponent', () => {
  let component: RiccioModalComponent;
  let fixture: ComponentFixture<RiccioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
