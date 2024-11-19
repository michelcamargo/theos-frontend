import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeadingFeedbackComponent } from './form-heading-feedback.component';

describe('FormHeadingFeedbackComponent', () => {
  let component: FormHeadingFeedbackComponent;
  let fixture: ComponentFixture<FormHeadingFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHeadingFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHeadingFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
