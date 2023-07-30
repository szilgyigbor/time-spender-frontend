import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageMessagesComponent } from './home-page-messages.component';

describe('HomePageMessagesComponent', () => {
  let component: HomePageMessagesComponent;
  let fixture: ComponentFixture<HomePageMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
