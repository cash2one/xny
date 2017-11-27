import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsdMainComponent } from './csd-main.component';

describe('CsdMainComponent', () => {
  let component: CsdMainComponent;
  let fixture: ComponentFixture<CsdMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsdMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsdMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
