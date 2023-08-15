import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSortingComponent } from './number-sorting.component';

describe('NumberSortingComponent', () => {
  let component: NumberSortingComponent;
  let fixture: ComponentFixture<NumberSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberSortingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
