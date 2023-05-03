import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayFowComponent } from './play-fow.component';

describe('PlayFowComponent', () => {
  let component: PlayFowComponent;
  let fixture: ComponentFixture<PlayFowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayFowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayFowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
