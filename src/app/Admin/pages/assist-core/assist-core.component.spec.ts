import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistCoreComponent } from './assist-core.component';

describe('AssistCoreComponent', () => {
  let component: AssistCoreComponent;
  let fixture: ComponentFixture<AssistCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
