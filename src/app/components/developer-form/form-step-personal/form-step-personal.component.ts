import {Component, Inject, Input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {GithubAuthComponent} from '../../github-auth/github-auth.component';

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
    GithubAuthComponent
  ],
  templateUrl: './form-step-personal.component.html',
  styleUrl: '../developer-form.component.scss'
})
export class FormStepPersonalComponent {
  @Input() formRef!: FormGroup;

  constructor() {}
}
