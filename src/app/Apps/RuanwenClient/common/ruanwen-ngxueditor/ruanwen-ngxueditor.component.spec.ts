import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenNgxueditorComponent } from './ruanwen-ngxueditor.component';

describe('RuanwenNgxueditorComponent', () => {
  let component: RuanwenNgxueditorComponent;
  let fixture: ComponentFixture<RuanwenNgxueditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenNgxueditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenNgxueditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
