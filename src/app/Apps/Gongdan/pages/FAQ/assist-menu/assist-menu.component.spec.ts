import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistMenuComponent } from './assist-menu.component';

describe('AssistMenuComponent', () => {
  let component: AssistMenuComponent;
  let fixture: ComponentFixture<AssistMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
