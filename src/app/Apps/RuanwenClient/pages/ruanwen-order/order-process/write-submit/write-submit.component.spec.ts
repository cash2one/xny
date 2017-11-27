import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteSubmitComponent } from './write-submit.component';

describe('WriteSubmitComponent', () => {
  let component: WriteSubmitComponent;
  let fixture: ComponentFixture<WriteSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
