import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistTableComponent } from './assist-table.component';

describe('AssistTableComponent', () => {
  let component: AssistTableComponent;
  let fixture: ComponentFixture<AssistTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
