import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMatterComponent } from './activity-matter.component';

describe('ActivityMatterComponent', () => {
  let component: ActivityMatterComponent;
  let fixture: ComponentFixture<ActivityMatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityMatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
