import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenWritingArticlesComponent } from './ruanwen-writing-articles.component';

describe('RuanwenWritingArticlesComponent', () => {
  let component: RuanwenWritingArticlesComponent;
  let fixture: ComponentFixture<RuanwenWritingArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenWritingArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenWritingArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
