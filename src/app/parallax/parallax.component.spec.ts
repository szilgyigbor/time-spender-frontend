import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxComponent } from './parallax.component';

describe('ParallaxComponent', () => {
  let component: ParallaxComponent;
  let fixture: ComponentFixture<ParallaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParallaxComponent]
    });
    fixture = TestBed.createComponent(ParallaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
