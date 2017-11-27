import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDelComponent } from './site-del.component';

describe('SiteDelComponent', () => {
  let component: SiteDelComponent;
  let fixture: ComponentFixture<SiteDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
