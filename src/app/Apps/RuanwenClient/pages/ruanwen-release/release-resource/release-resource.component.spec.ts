import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseResourceComponent } from './release-resource.component';

describe('ReleaseResourceComponent', () => {
  let component: ReleaseResourceComponent;
  let fixture: ComponentFixture<ReleaseResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
