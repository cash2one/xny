import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdInfoComponent } from './gd-info.component';

describe('GdInfoComponent', () => {
  let component: GdInfoComponent;
  let fixture: ComponentFixture<GdInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
