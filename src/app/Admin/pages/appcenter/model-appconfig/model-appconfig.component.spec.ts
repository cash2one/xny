import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAppconfigComponent } from './model-appconfig.component';

describe('ModelAppconfigComponent', () => {
  let component: ModelAppconfigComponent;
  let fixture: ComponentFixture<ModelAppconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAppconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAppconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
