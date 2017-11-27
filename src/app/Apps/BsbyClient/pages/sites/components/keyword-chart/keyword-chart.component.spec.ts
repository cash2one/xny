import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordChartComponent } from './keyword-chart.component';

describe('KeywordChartComponent', () => {
  let component: KeywordChartComponent;
  let fixture: ComponentFixture<KeywordChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
