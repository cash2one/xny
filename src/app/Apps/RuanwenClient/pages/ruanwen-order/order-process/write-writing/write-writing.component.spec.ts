import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteWritingComponent } from './write-writing.component';

describe('WriteWritingComponent', () => {
  let component: WriteWritingComponent;
  let fixture: ComponentFixture<WriteWritingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteWritingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
