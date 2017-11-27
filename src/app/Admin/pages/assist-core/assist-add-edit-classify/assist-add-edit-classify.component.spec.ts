import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistAddEditClassifyComponent } from './assist-add-edit-classify.component';

describe('AssistAddEditClassifyComponent', () => {
  let component: AssistAddEditClassifyComponent;
  let fixture: ComponentFixture<AssistAddEditClassifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistAddEditClassifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistAddEditClassifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
