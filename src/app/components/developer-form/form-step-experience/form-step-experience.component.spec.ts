import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepExperienceComponent } from './form-step-experience.component';

describe('DevFormStepGeneralComponent', () => {
  let component: FormStepExperienceComponent;
  let fixture: ComponentFixture<FormStepExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStepExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStepExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
