import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAppcenterComponent } from './add-edit-appcenter.component';

describe('AddEditAppcenterComponent', () => {
  let component: AddEditAppcenterComponent;
  let fixture: ComponentFixture<AddEditAppcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAppcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAppcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
