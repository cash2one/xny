import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioTopLoadingComponent } from './riccio-top-loading.component';

describe('RiccioTopLoadingComponent', () => {
  let component: RiccioTopLoadingComponent;
  let fixture: ComponentFixture<RiccioTopLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioTopLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioTopLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
