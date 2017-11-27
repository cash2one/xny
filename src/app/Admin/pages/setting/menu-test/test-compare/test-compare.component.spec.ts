import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompareComponent } from './test-compare.component';

describe('TestCompareComponent', () => {
  let component: TestCompareComponent;
  let fixture: ComponentFixture<TestCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
