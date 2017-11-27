import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioBrowseComponent } from './riccio-browse.component';

describe('RiccioBrowseComponent', () => {
  let component: RiccioBrowseComponent;
  let fixture: ComponentFixture<RiccioBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
