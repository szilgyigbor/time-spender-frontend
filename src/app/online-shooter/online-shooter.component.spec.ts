import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineShooterComponent } from './online-shooter.component';

describe('OnlineShooterComponent', () => {
  let component: OnlineShooterComponent;
  let fixture: ComponentFixture<OnlineShooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineShooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineShooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
