import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioCutComponent } from './riccio-cut.component';

describe('RiccioCutComponent', () => {
  let component: RiccioCutComponent;
  let fixture: ComponentFixture<RiccioCutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioCutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
