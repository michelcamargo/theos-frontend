import {Component, Input} from '@angular/core';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'form-step-github',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatButton,
    NgOptimizedImage,
    NgIf,
    MatError,
  ],
  templateUrl: './form-step-github.component.html',
  styleUrl: '../developer-form.component.scss'
})
export class FormStepGithubComponent {
  @Input() formRef!: FormGroup;

  imageFile?: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor() {}

  onFileSelected(event: Event | null): void {
    if (!event) {
      this.imageFile = undefined;
      this.imagePreview = null;
      this.formRef.get('avatarUrl')?.setValue(null);
      this.formRef.get('avatarUrl')?.enable();
      this.formRef.get('avatarUrl')?.updateValueAndValidity();
      return;
    }

    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        const base64Image = reader.result as string;
        // this.formRef.get('avatarUrl')?.setValue(base64Image);
        // this.formRef.get('avatarUrl')?.disable();
        // this.formRef.updateValueAndValidity();
        // this.formRef.get('avatarUrl')?.updateValueAndValidity();
        // this.formRef.get('avatarUrl')?.markAsTouched();

        this.formRef.get('avatarUrl')?.setValue(base64Image);
        this.formRef.get('avatarUrl')?.disable();
        this.formRef.get('avatarUrl')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  onUrlChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.imagePreview = input.value;
      this.formRef.get('avatarUrl')?.setValue(this.imagePreview);
      this.formRef.get('avatarUrl')?.updateValueAndValidity();
    }
  }
}
