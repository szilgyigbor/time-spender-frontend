import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CheckWeatherComponent } from './check-weather.component';

describe('CheckWeatherComponent', () => {
  let component: CheckWeatherComponent;
  let fixture: ComponentFixture<CheckWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckWeatherComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
