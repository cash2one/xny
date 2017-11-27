import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupingTreeComponent } from './grouping-tree.component';

describe('GroupingTreeComponent', () => {
  let component: GroupingTreeComponent;
  let fixture: ComponentFixture<GroupingTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupingTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupingTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
