import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseResourceInfoComponent } from './release-resource-info.component';

describe('ReleaseResourceInfoComponent', () => {
  let component: ReleaseResourceInfoComponent;
  let fixture: ComponentFixture<ReleaseResourceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseResourceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseResourceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
