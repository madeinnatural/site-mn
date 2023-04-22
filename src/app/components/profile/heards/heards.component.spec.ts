import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeardsComponent } from './heards.component';

describe('HeardsComponent', () => {
  let component: HeardsComponent;
  let fixture: ComponentFixture<HeardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
