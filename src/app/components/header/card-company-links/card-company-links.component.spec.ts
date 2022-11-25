/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardCompanyLinksComponent } from './card-company-links.component';

describe('CardCompanyLinksComponent', () => {
  let component: CardCompanyLinksComponent;
  let fixture: ComponentFixture<CardCompanyLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCompanyLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCompanyLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
