/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyElasticLayerComponent } from './my-elastic-layer.component';

describe('MyElasticLayerComponent', () => {
  let component: MyElasticLayerComponent;
  let fixture: ComponentFixture<MyElasticLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyElasticLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyElasticLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
