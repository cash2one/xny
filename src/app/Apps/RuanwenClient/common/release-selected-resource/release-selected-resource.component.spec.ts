import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseSelectedResourceComponent } from './release-selected-resource.component';

describe('ReleaseSelectedResourceComponent', () => {
  let component: ReleaseSelectedResourceComponent;
  let fixture: ComponentFixture<ReleaseSelectedResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseSelectedResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseSelectedResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
