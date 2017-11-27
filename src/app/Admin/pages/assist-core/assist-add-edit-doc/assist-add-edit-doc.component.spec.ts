import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistAddEditDocComponent } from './assist-add-edit-doc.component';

describe('AssistAddEditDocComponent', () => {
  let component: AssistAddEditDocComponent;
  let fixture: ComponentFixture<AssistAddEditDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistAddEditDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistAddEditDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
