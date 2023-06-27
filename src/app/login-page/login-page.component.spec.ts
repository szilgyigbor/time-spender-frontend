import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { PostRequestsService } from '../services/post-requests.service';
import { LoginService } from '../services/login.service';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [ HttpClientTestingModule, FormsModule],
      providers: [ PostRequestsService, LoginService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call sendLoginData with the correct argument', () => {
    const fakeResponse = {access_token: 'test', expires_at: 'test', username: 'test', email: 'test@gmail.com'};
    const postRequestsService = TestBed.inject(PostRequestsService);
    spyOn(postRequestsService, 'sendLoginData').and.returnValue(of(fakeResponse));
    component.sendLogin();
    expect(postRequestsService.sendLoginData).toHaveBeenCalledWith(component.loginData);
  });


  it('should call setLoggedIn with true', () => {
    const fakeResponse = {access_token: 'test', expires_at: 'test', username: 'test', email: 'test@gmail.com'};
    const postRequestsService = TestBed.inject(PostRequestsService);
    spyOn(postRequestsService, 'sendLoginData').and.returnValue(of(fakeResponse));
    const loginService = TestBed.inject(LoginService);
    spyOn(loginService, 'setLoggedIn');
    component.sendLogin();
    expect(loginService.setLoggedIn).toHaveBeenCalledWith(true);
  });

});
