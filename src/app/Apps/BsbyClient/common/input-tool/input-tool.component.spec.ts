import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputToolComponent } from './input-tool.component';

describe('InputToolComponent', () => {
  let component: InputToolComponent;
  let fixture: ComponentFixture<InputToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
