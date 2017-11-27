import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBsbyClientComponent } from './model-bsbyClient.component';

describe('ModelProjectComponent', () => {
  let component: ModelBsbyClientComponent;
  let fixture: ComponentFixture<ModelBsbyClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelBsbyClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelBsbyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
