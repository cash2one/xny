import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRuanwenServiceComponent } from './model-ruanwenService.component';

describe('ModelProjectComponent', () => {
  let component: ModelRuanwenServiceComponent;
  let fixture: ComponentFixture<ModelRuanwenServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelRuanwenServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRuanwenServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
