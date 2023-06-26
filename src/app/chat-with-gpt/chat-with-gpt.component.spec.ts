import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatWithGptComponent } from './chat-with-gpt.component';

describe('ChatWithGptComponent', () => {
  let component: ChatWithGptComponent;
  let fixture: ComponentFixture<ChatWithGptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatWithGptComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWithGptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
