import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteRejectComponent } from './write-reject.component';

describe('WriteRejectComponent', () => {
  let component: WriteRejectComponent;
  let fixture: ComponentFixture<WriteRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
