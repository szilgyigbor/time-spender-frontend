import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsernamesComponent } from './show-usernames.component';

describe('ShowUsernamesComponent', () => {
  let component: ShowUsernamesComponent;
  let fixture: ComponentFixture<ShowUsernamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowUsernamesComponent]
    });
    fixture = TestBed.createComponent(ShowUsernamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
