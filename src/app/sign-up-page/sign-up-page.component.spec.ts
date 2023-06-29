import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostRequestsService } from '../services/post-requests.service';
import { FormsModule } from '@angular/forms';

import { SignUpPageComponent } from './sign-up-page.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from '../services/login.service';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpPageComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ PostRequestsService, Router, LoginService ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should navigate to the homepage', () => {
    const fakeResponse = {access_token: 'test', expires_at: 'test', username: 'test', email: 'test@gmail.com'};
    const postRequestsService = TestBed.inject(PostRequestsService);
    spyOn(postRequestsService, 'sendSignUpData').and.returnValue(of(fakeResponse));
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.signUpData = { username: 'test', email: 'test@email.com', password: 'test'};
    component.passwordConfirm = 'test';
    component.sendSignUp();
  
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
 

});
