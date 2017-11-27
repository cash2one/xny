import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GongdanComponent } from './gongdan.component';

describe('GongdanComponent', () => {
  let component: GongdanComponent;
  let fixture: ComponentFixture<GongdanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GongdanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GongdanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
