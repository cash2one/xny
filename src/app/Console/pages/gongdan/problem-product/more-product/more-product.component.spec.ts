import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreProductComponent } from './more-product.component';

describe('MoreProductComponent', () => {
  let component: MoreProductComponent;
  let fixture: ComponentFixture<MoreProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
