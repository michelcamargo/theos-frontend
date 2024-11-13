import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepPersonalComponent } from './form-step-personal.component';

describe('DevFormStepPersonalComponent', () => {
  let component: FormStepPersonalComponent;
  let fixture: ComponentFixture<FormStepPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStepPersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStepPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
