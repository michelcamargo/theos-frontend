import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomUser } from '../../models/custom-user.model';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormStepGithubComponent } from './form-step-github/form-step-github.component';
import { FormStepPersonalComponent } from './form-step-personal/form-step-personal.component';
import { FormStepExperienceComponent } from './form-step-experience/form-step-experience.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgComponentOutlet, NgIf } from '@angular/common';
import { UsersService } from '../../services/users.service';
// import { base64ImageValidator } from '../../helpers/validators.helper';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  userInfo: any;
  error: string | null = null;
  userList: CustomUser[] = [];
  currentStep: number;
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

  githubUsernameControl = new FormControl('', [Validators.required]);

  constructor(
    private form: FormBuilder,
    private usersService: UsersService,
    private dialog: MatDialog,
    private alert: MatSnackBar,
  ) {
    this.currentStep = 0;
    this.userForm = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      githubUsername: ['', Validators.required],
      githubUrl: ['', Validators.required],
      avatarUrl: ['', [Validators.required]],
      // avatarUploadImage: [base64ImageValidator],
      city: [''],
      education: [''],
      skills: ['']
    });
  }

  fetchGithubData() {
    this.githubUsernameControl.valueChanges.pipe(
      debounceTime(2000),
      switchMap((username) => {
        if (username) {
          return this.usersService.getUserInfo(username).pipe(
            catchError((error: HttpErrorResponse) => {
              this.error = 'Usuário não encontrado ou erro na requisição';
              return of(null);
            })
          );
        }
        return of(null);
      })
    ).subscribe((data) => {
      if (data) {
        this.userInfo = data;
        this.error = null;
      }
    });

  //   const username = this.userForm.get('githubUsername')?.value;
  //   if (username) {
  //     this.usersService.getUserInfo(username).subscribe({
  //       next: (data) => {
  //         this.userForm.patchValue({
  //           name: data.name,
  //           avatarUrl: data.avatar_url,
  //           githubUrl: data.html_url
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Erro ao buscar dados do GitHub:', err);
  //         this.alert.open('Usuário não encontrado. Verifique o nome de usuário.', 'Fechar', {
  //           duration: 3000,
  //           panelClass: ['error-snackbar']
  //         });
  //       }
  //     });
  //   }
  }

  ngOnInit() {
    this.fetchGithubData();
  }

  githubAccountLoginHandler() {

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

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const incomingUser: CustomUser = {
        ...formData,
        skills: formData.skills.split(',').map((skill: string) => skill.trim())
      };
      this.userList.push(incomingUser);
      this.alert.open('Usuário cadastrado com sucesso!', 'Fechar', {
        duration: 3000,
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
