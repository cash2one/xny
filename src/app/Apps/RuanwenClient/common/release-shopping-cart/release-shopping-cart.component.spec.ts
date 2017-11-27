import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseShoppingCartComponent } from './release-shopping-cart.component';

describe('ReleaseShoppingCartComponent', () => {
  let component: ReleaseShoppingCartComponent;
  let fixture: ComponentFixture<ReleaseShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
