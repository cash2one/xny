import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioBreadcrumbComponent } from './riccio-breadcrumb.component';

describe('RiccioBreadcrumbComponent', () => {
  let component: RiccioBreadcrumbComponent;
  let fixture: ComponentFixture<RiccioBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
