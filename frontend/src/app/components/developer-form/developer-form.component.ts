import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomUser } from '../../models/custom-user.model';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormStepGithubComponent } from './form-step-github/form-step-github.component';
import { FormStepPersonalComponent } from './form-step-personal/form-step-personal.component';
import { FormStepExperienceComponent } from './form-step-experience/form-step-experience.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgComponentOutlet, NgIf } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { debounceTime, distinctUntilChanged, filter, take } from 'rxjs';
import { FieldAutocompleteIndex } from '../../types/form';
import { UsersService } from '../../services/users.service';
import ValidatorsHelper from '../../helpers/validators.helper';
import {FormHeadingFeedbackComponent} from './form-heading-feedback/form-heading-feedback.component';

@Component({
  selector: 'app-developer-form',
  standalone: true,
  imports: [
    MatFormField,
    MatCard,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatHint,
    FormStepGithubComponent,
    FormStepPersonalComponent,
    FormStepExperienceComponent,
    NgIf,
    NgComponentOutlet,
    FormHeadingFeedbackComponent,
  ],
  templateUrl: './developer-form.component.html',
  styleUrl: './developer-form.component.scss'
})
export class DeveloperFormComponent implements OnInit {
  @Output() developerAdded = new EventEmitter<CustomUser>();

  userForm: FormGroup;
  inheritAuthInfo?: Partial<CustomUser>;
  suggestionUsers: Partial<CustomUser>[] = [];
  lastSuggestionReference?: string;
  currentStep: number;
  isDebouncing: boolean = false;
  steps = [
    {
      groupName: 'personal',
      component: FormStepPersonalComponent,
      fields: ['name', 'email', 'city'],
    },
    {
      groupName: 'github',
      component: FormStepGithubComponent,
      fields: ['githubUrl', 'avatarUrl'],
    },
    {
      groupName: 'experience',
      component: FormStepExperienceComponent,
      fields: ['education', 'skills'],
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { partialProfile?: Partial<CustomUser> },
    private form: FormBuilder,
    private githubService: GithubService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private alert: MatSnackBar,
  ) {
    const { partialProfile } = data;

    if (partialProfile) {
      this.inheritAuthInfo = partialProfile
    }

    this.currentStep = 0;
    this.userForm = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, ValidatorsHelper.emailFormInput()]],
      githubUrl: ['', [Validators.required, ValidatorsHelper.urlFormInput()]],
      avatarUrl: ['', [Validators.required, ValidatorsHelper.urlFormInput()]],
      city: ['', [Validators.required]],
      education: ['', [Validators.required]],
      skills: ['', [Validators.required]]
    });
  }

  isStepValid(): boolean {
    return this.steps[this.currentStep].fields.every(field => this.userForm.get(field)?.valid);
  }

  setupAutoComplete(field: string, page: number = 1, _debounceTime = 2000) {
    const inputControl = this.userForm.get(field);

    if (!inputControl) {
      console.warn(`Auto-complete: campo "${field}" não encontrado.`);
      return;
    }

    inputControl.valueChanges.pipe(
      debounceTime(_debounceTime),
      distinctUntilChanged(),
      filter(name => !!name && name !== this.lastSuggestionReference),
      take(1)
    ).subscribe(nameValue => {
      this.isDebouncing = true;

      if (nameValue) {
        this.githubService.searchUsers({ fullname: nameValue }, { page }).subscribe({
          next: (users) => {
            if (!users || !users.length) return;

            this.suggestionUsers = users;
            console.log('Usuários encontrados:', users);
          },
          error: (error) => {
            console.warn(`Falha ao autocompletar campo ${field}.`, error);
            this.isDebouncing = false;
          },
          complete: () => {
            this.isDebouncing = false;
            this.lastSuggestionReference = nameValue;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.setupAutoComplete('name');
    if (this.inheritAuthInfo) {
      this.userForm.patchValue(this.inheritAuthInfo);
      this.validateCurrentStep();
    }
  }

  validateCurrentStep() {
    this.steps[this.currentStep].fields.forEach(field => {
      const control = this.userForm.get(field);
      if (control && control.invalid) {
        control.markAsTouched();
      }
    });
  }

  autoCompleteHandler({ page, field, debounceTime}: FieldAutocompleteIndex) {
    this.setupAutoComplete(field, page, debounceTime);
  }

  changeStepHandler(step: number) {
    if (step < 0 && step >= -(this.steps.length - 1)) {
      this.currentStep = this.currentStep + step;
      return;
    }

    const validatorAlert = (errors: string[]) => {
      this.alert.open(`Preencha os campos obrigatórios para continuar ${errors}`, 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      })
    };

    if (!this.steps[this.currentStep].fields.every(field => {
      if (!this.userForm.get(field)?.valid) {
        validatorAlert([`Campo ${field} inválido`]);
        return false
      }
      return true;
    })) {

      return;
    }

    const updatedStep = this.currentStep + step;

    if (updatedStep >= 0 && updatedStep < this.steps.length) {
      this.currentStep = updatedStep;
    }
  }

  closeFormDialog() {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const incomingUser: CustomUser = {
        ...formData,
        skills: formData.skills.split(',').map((skill: string) => skill.trim())
      };

      this.usersService.registerNew(incomingUser).subscribe({
        next: (user: CustomUser) => {
          this.developerAdded.emit(user);

          this.alert.open('Usuário cadastrado com sucesso!', 'Fechar', {
            duration: 2000,
            panelClass: ['success-snackbar']
          });
        },
        error: (err) =>  {
          this.alert.open('Falha ao salvar usuário, por favor, tente novamente', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Falha ao salvar usuário', err)
        },
        complete: () => this.userForm.reset(),
      });
    } else {
      this.alert.open('Campos obrigatórios não preenchidos.', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
