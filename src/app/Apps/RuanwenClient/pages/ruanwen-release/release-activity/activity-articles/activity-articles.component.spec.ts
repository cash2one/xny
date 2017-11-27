import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityArticlesComponent } from './activity-articles.component';

describe('ActivityArticlesComponent', () => {
  let component: ActivityArticlesComponent;
  let fixture: ComponentFixture<ActivityArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
