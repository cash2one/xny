import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenReleaseComponent } from './ruanwen-release.component';

describe('RuanwenReleaseComponent', () => {
  let component: RuanwenReleaseComponent;
  let fixture: ComponentFixture<RuanwenReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
