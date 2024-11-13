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
import { UsersService } from '../../services/users.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

type FieldAutocompleteIndex = { field: string, page: number };

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
  ],
  templateUrl: './developer-form.component.html',
  styleUrl: './developer-form.component.scss'
})
export class DeveloperFormComponent implements OnInit {
  @Output() developerAdded = new EventEmitter<CustomUser>();

  userForm: FormGroup;
  inheritAuthInfo?: Partial<CustomUser>;
  userList: CustomUser[] = [];
  currentStep: number;
  filteredUsers: any[] = [];
  autoCompleteIndexes: FieldAutocompleteIndex[] = [
    { field: 'name', page: 1 },
  ];
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
      fields: ['githubUsername', 'avatarUrl'],
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
    private usersService: UsersService,
    private dialog: MatDialog,
    private alert: MatSnackBar,
  ) {
    const { partialProfile } = data;

    if (partialProfile) { this.inheritAuthInfo = partialProfile }

    this.currentStep = 0;
    this.userForm = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      githubUsername: ['', Validators.required],
      githubUrl: ['', Validators.required],
      avatarUrl: ['', [Validators.required]],
      city: [''],
      education: [''],
      skills: ['']
    });
  }

  isStepValid(): boolean {
    return this.steps[this.currentStep].fields.every(field => this.userForm.get(field)?.valid);
  }

  setupAutoComplete(field: string, _debounceTime = 2000) {
    const inputControl = this.userForm.get(field);

    if (!inputControl) {
      console.warn(`Auto-complete: campo "${field}" não encontrado.`);
      return;
    }

    inputControl.valueChanges.pipe(
      debounceTime(_debounceTime),
      distinctUntilChanged()
    ).subscribe(name => {
      this.isDebouncing = true;

      const autocompleteInfo = this.autoCompleteIndexes.find(item => item.field === field)

      if (name) {
        this.usersService.getUserByFullname(name, autocompleteInfo?.page ?? 1).subscribe({
          next: (user) => {
            if (!user) {
              console.log('> not found by name')
              return;
            }

              // this.userForm.get('');
              console.log('Usuário encontrado:', user);
          },
          error: (error) => {
            console.warn(`Falha ao autocompletar do campo ${field}.`, error);
          },
          complete: () => {
            this.isDebouncing = false;
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

  changeStepHandler(step: number) {
    if (step < 0 && step >= -(this.steps.length - 1)) {
      this.currentStep = this.currentStep + step;
      return;
    }

    const validatorAlert = () => this.alert.open(`Preencha os campos obrigatórios para continuar`, 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });

    if (!this.steps[this.currentStep].fields.every(field => !!this.userForm.get(field)?.valid)) {
      validatorAlert();
      return;
    }

    const updatedStep = this.currentStep + step;

    if (updatedStep >= 0 && updatedStep < this.steps.length) {
      this.currentStep = updatedStep;
    }
  }

  closeForm() {
    this.dialog.closeAll();
  }

  loadNextPage(field: string = 'name') {
    const autocompleteInfo = this.autoCompleteIndexes.find(item => item.field === field)\
    if (autocompleteInfo) {
      autocompleteInfo.page++;
      this.setupAutoComplete(field);
    }
  }

  onSubmit() {
    console.log({ form: this.userForm, valid: this.userForm.valid, error: this.userForm.errors })

    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const incomingUser: CustomUser = {
        ...formData,
        skills: formData.skills.split(',').map((skill: string) => skill.trim())
      };

      this.userList.push(incomingUser);
      this.developerAdded.emit(incomingUser);

      this.alert.open('Usuário cadastrado com sucesso!', 'Fechar', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });

      this.userForm.reset();
    } else {
      this.alert.open('Campos obrigatórios não preenchidos.', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
