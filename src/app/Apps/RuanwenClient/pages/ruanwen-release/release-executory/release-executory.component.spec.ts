import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseExecutoryComponent } from './release-executory.component';

describe('ReleaseExecutoryComponent', () => {
  let component: ReleaseExecutoryComponent;
  let fixture: ComponentFixture<ReleaseExecutoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseExecutoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseExecutoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
