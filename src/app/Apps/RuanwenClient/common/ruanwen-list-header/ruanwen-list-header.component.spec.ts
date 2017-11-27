import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenListHeaderComponent } from './ruanwen-list-header.component';

describe('RuanwenListHeaderComponent', () => {
  let component: RuanwenListHeaderComponent;
  let fixture: ComponentFixture<RuanwenListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
