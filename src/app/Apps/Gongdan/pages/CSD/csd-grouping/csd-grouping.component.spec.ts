import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsdGroupingComponent } from './csd-grouping.component';

describe('CsdGroupingComponent', () => {
  let component: CsdGroupingComponent;
  let fixture: ComponentFixture<CsdGroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsdGroupingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsdGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
