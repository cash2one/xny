import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoadingComponent } from './my-loading.component';

describe('MyLoadingComponent', () => {
  let component: MyLoadingComponent;
  let fixture: ComponentFixture<MyLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
