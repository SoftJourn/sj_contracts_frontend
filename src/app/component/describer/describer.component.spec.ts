/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DescriberComponent } from './describer.component';

describe('DescriberComponent', () => {
  let component: DescriberComponent;
  let fixture: ComponentFixture<DescriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
