import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioPopUpRightComponent } from './riccio-pop-up-right.component';

describe('RiccioPopUpRightComponent', () => {
  let component: RiccioPopUpRightComponent;
  let fixture: ComponentFixture<RiccioPopUpRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioPopUpRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioPopUpRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
