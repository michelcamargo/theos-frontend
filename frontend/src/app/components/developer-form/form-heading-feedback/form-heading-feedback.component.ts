import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'form-heading-feedback',
  standalone: true,
  imports: [],
  templateUrl: './form-heading-feedback.component.html',
  styleUrl: './form-heading-feedback.component.scss'
})
export class FormHeadingFeedbackComponent {
  @Input({ required: true }) formRef!: FormGroup;

  constructor() {}

  getFieldValue(field: string) {
    const fieldControl = this.formRef.get(field)
    return fieldControl?.value;
  }
}
