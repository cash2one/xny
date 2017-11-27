import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBsbyServiceComponent } from './model-bsbyService.component';

describe('ModelProjectComponent', () => {
  let component: ModelBsbyServiceComponent;
  let fixture: ComponentFixture<ModelBsbyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelBsbyServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelBsbyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
