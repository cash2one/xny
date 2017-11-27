import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsbyUeditorComponent } from './bsby-ueditor.component';

describe('BsbyUeditorComponent', () => {
  let component: BsbyUeditorComponent;
  let fixture: ComponentFixture<BsbyUeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsbyUeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsbyUeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
