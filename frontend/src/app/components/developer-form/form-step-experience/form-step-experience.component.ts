import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'form-step-experience',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatHint,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './form-step-experience.component.html',
  styleUrl: '../developer-form.component.scss'
})
export class FormStepExperienceComponent {
  @Input({ required: true }) formRef!: FormGroup;

  getFieldValue(field: string) {
    const fieldControl = this.formRef.get(field)
    return fieldControl?.value;
  }

  constructor() {
    console.log({ previewValues: this.formRef })
  }

}
