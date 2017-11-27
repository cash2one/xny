import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRuanwenClientComponent } from './model-ruanwenClient.component';

describe('ModelProjectComponent', () => {
  let component: ModelRuanwenClientComponent;
  let fixture: ComponentFixture<ModelRuanwenClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelRuanwenClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRuanwenClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
