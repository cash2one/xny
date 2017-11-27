import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecoundMenuComponent } from './secound-menu.component';

describe('SecoundMenuComponent', () => {
  let component: SecoundMenuComponent;
  let fixture: ComponentFixture<SecoundMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecoundMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecoundMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
