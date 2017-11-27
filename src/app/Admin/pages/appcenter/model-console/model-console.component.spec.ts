import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConsoleComponent } from './model-console.component';

describe('ModelConsoleComponent', () => {
  let component: ModelConsoleComponent;
  let fixture: ComponentFixture<ModelConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
