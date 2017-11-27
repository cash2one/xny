import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioPboxComponent } from './riccio-pbox.component';

describe('RiccioPboxComponent', () => {
  let component: RiccioPboxComponent;
  let fixture: ComponentFixture<RiccioPboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioPboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioPboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
