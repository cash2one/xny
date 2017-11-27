import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteCompleteComponent } from './write-complete.component';

describe('WriteCompleteComponent', () => {
  let component: WriteCompleteComponent;
  let fixture: ComponentFixture<WriteCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
