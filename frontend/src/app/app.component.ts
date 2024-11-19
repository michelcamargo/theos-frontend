import { Component, OnInit } from '@angular/core';
import { CustomUser } from './models/custom-user.model';
import { UsersService } from './services/users.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DeveloperFormComponent } from './components/developer-form/developer-form.component';
import { DeveloperFilterComponent } from './components/developer-filter/developer-filter.component';
import { DeveloperListComponent } from './components/developer-list/developer-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { DeveloperListFilter } from './types/developer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeveloperFormComponent, DeveloperFilterComponent, DeveloperListComponent, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  filteringDevelopersPage: number = 1;
  isLoadingDevelopers: boolean = false;
  availableDevelopers: CustomUser[] = [];
  filteringDevelopersList: CustomUser[] = [];
  authenticatedUser?: CustomUser = undefined;
  currentFilters: DeveloperListFilter = {};
  hasActiveFilters: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private usersService: UsersService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  showError(message: string, duration = 3000) {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  showSuccess(message: string, duration = 3000) {
    this.snackBar.open(message, 'Fechar', {
      duration,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  openUserFormDialog() {
    const dialogRef = this.dialog.open(DeveloperFormComponent, {
      width: '480px',
      data: {
        partialProfile: this.authenticatedUser,
      },
      hasBackdrop: true,
    });

    dialogRef.componentInstance.developerAdded.subscribe((user: CustomUser) => {
      if (!user) {
        this.showError('Desenvolvedor não cadastrado.', 1000);
        this.loadRegisteredDevelopers();
        dialogRef.close();
      }

      if (user) {
        // this.filteringDevelopersList.push(user);
        // this.availableDevelopers.push(user);
        this.loadRegisteredDevelopers();

        this.showSuccess('Desenvolvedor adicionado à lista.')

        dialogRef.close();
      }
    });
  }

  loadRegisteredDevelopers() {
    this.isLoadingDevelopers = true;
    this.usersService.getUsers({ page: this.filteringDevelopersPage }).subscribe({
      next: (developers) => {
        this.availableDevelopers = developers;
        this.filteringDevelopersList = developers;
      },
      error: (error) => {
        this.showError('Falha ao buscar lista de desenvolvedores');
        console.error(error, 'Falha ao buscar lista de desenvolvedores')
      },
      complete: () => {
        this.isLoadingDevelopers = false;
      }
    });
  }

  runQueryParamAuthentication() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.getAuthUser(code).subscribe({
          next: (authUser) => {
            this.showSuccess('Autenticado');
            this.authenticatedUser = authUser;
          },
          error: (error) => {
            console.error('Falha em autenticação: ', error);
            this.showError('Falha ao autenticar-se, tente novamente.');
          },
          complete: () => {
            const url = new URL(window.location.href);
            url.searchParams.delete('code');
            window.history.replaceState({}, document.title, url.toString());
            this.openUserFormDialog();
          }
        });
      }
    });
  }

  ngOnInit() {
    this.loadRegisteredDevelopers();
    this.runQueryParamAuthentication();
  }

  filterChangeHandler({ skills, city, education }: DeveloperListFilter): void {
    this.currentFilters = { skills, city, education };
    this.hasActiveFilters = Boolean(Boolean(skills) || Boolean(education) || Boolean(city));

    this.filteringDevelopersList = this.availableDevelopers.filter(dev => {
      const skillsArray = skills ? skills.split(',').map(skill => skill.trim()) : [];

      const matchSkills = skills
        ? skillsArray.every(skill => {
          return dev.skills.some(devSkill => devSkill.toLowerCase().includes(skill.toLowerCase()))
        }) : true;

      const matchCity = city ? dev.city.toLowerCase().includes(city.toLowerCase()) : true;
      const matchEducation = education ? dev.education.toLowerCase().includes(education.toLowerCase()) : true;

      return Boolean(Boolean(matchSkills) && Boolean(matchCity) && Boolean(matchEducation));
    });
  }

}
