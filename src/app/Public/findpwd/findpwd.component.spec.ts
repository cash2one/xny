import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindpwdComponent } from './findpwd.component';

describe('FindpwdComponent', () => {
  let component: FindpwdComponent;
  let fixture: ComponentFixture<FindpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
