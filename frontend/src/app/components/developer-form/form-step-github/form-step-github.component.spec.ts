import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepGithubComponent } from './form-step-github.component';

describe('DevFormStepXpComponent', () => {
  let component: FormStepGithubComponent;
  let fixture: ComponentFixture<FormStepGithubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStepGithubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStepGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
