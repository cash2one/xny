import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGongdanComponent } from './my-gongdan.component';

describe('MyGongdanComponent', () => {
  let component: MyGongdanComponent;
  let fixture: ComponentFixture<MyGongdanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGongdanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGongdanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
