import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseScreenResourceComponent } from './release-screen-resource.component';

describe('ReleaseScreenResourceComponent', () => {
  let component: ReleaseScreenResourceComponent;
  let fixture: ComponentFixture<ReleaseScreenResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseScreenResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseScreenResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
