import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelProjectComponent } from './model-project.component';

describe('ModelProjectComponent', () => {
  let component: ModelProjectComponent;
  let fixture: ComponentFixture<ModelProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
