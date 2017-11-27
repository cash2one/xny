import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioTreeComponent } from './riccio-tree.component';

describe('RiccioTreeComponent', () => {
  let component: RiccioTreeComponent;
  let fixture: ComponentFixture<RiccioTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
