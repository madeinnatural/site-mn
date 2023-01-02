/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MnIconComponent } from './mn-icon.component';

describe('MnIconComponent', () => {
  let component: MnIconComponent;
  let fixture: ComponentFixture<MnIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
