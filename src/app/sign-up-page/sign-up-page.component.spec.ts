import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostRequestsService } from '../services/post-requests.service';
import { FormsModule } from '@angular/forms';

import { SignUpPageComponent } from './sign-up-page.component';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpPageComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ PostRequestsService ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
