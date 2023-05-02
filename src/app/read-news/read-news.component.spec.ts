import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadNewsComponent } from './read-news.component';

describe('ReadNewsComponent', () => {
  let component: ReadNewsComponent;
  let fixture: ComponentFixture<ReadNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
