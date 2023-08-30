import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniDialogComponent } from './uni-dialog.component';

describe('UniDialogComponent', () => {
  let component: UniDialogComponent;
  let fixture: ComponentFixture<UniDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniDialogComponent]
    });
    fixture = TestBed.createComponent(UniDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
