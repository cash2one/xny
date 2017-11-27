import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenArticleComponent } from './ruanwen-article.component';

describe('RuanwenArticleComponent', () => {
  let component: RuanwenArticleComponent;
  let fixture: ComponentFixture<RuanwenArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
