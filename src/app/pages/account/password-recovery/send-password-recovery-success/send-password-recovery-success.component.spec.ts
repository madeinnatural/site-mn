import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPasswordRecoverySuccessComponent } from './send-password-recovery-success.component';

describe('SendPasswordRecoverySuccessComponent', () => {
  let component: SendPasswordRecoverySuccessComponent;
  let fixture: ComponentFixture<SendPasswordRecoverySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPasswordRecoverySuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPasswordRecoverySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
