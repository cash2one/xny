import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAdminComponent } from './model-admin.component';

describe('ModelAdminComponent', () => {
  let component: ModelAdminComponent;
  let fixture: ComponentFixture<ModelAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
