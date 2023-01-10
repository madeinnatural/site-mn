import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLupaComponent } from './button-lupa.component';

describe('ButtonLupaComponent', () => {
  let component: ButtonLupaComponent;
  let fixture: ComponentFixture<ButtonLupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLupaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
