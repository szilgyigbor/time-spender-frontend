import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageOpinionsComponent } from './home-page-opinions.component';

describe('HomePageMessagesComponent', () => {
  let component: HomePageOpinionsComponent;
  let fixture: ComponentFixture<HomePageOpinionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageOpinionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
