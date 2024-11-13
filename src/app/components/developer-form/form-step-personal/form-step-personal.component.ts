import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { GithubAuthComponent } from '../../github-auth/github-auth.component';
import { CustomUser } from '../../../models/custom-user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'form-step-personal',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    GithubAuthComponent,
    NgIf
  ],
  templateUrl: './form-step-personal.component.html',
  styleUrl: '../developer-form.component.scss'
})
export class FormStepPersonalComponent {
  @Input() formRef!: FormGroup;
  @Input() partialProfile?: Partial<CustomUser>;

  constructor() {}

  protected readonly Boolean = Boolean;
}
