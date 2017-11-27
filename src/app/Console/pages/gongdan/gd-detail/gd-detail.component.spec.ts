import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdDetailComponent } from './gd-detail.component';

describe('GdDetailComponent', () => {
  let component: GdDetailComponent;
  let fixture: ComponentFixture<GdDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
