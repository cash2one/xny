import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToEmailComponent } from './add-to-email.component';

describe('AddToEmailComponent', () => {
  let component: AddToEmailComponent;
  let fixture: ComponentFixture<AddToEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
