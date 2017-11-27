import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistMainComponent } from './assist-main.component';

describe('AssistMainComponent', () => {
  let component: AssistMainComponent;
  let fixture: ComponentFixture<AssistMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
