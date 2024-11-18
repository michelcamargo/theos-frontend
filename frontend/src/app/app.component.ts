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
import {DeveloperFilter} from './types/developer';

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
      if (user) {
        this.filteringDevelopersList.push(user);
        this.availableDevelopers.push(user);
        this.showSuccess('Desenvolvedor adicionado à lista.')

        dialogRef.close();
      }
    });

    dialogRef.afterClosed().subscribe((user: CustomUser) => {
      this.loadRegisteredDevelopers();
      if (!user) {
        this.showError('Desenvolvedor não cadastrado.', 1000);
        return;
      }
    });
  }

  loadRegisteredDevelopers() {
    this.isLoadingDevelopers = true;
    this.usersService.getUsers({ page: this.filteringDevelopersPage }).subscribe({
      next: (developers) => {

        console.log({ developers })

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

  filterChangeHandler({ skills, city, education }: DeveloperFilter): void {
    this.filteringDevelopersList = this.availableDevelopers.filter(dev => {
      const hasSkills = skills ? skills.split(',').every(skill => dev.skills.includes(skill.trim())) : true;
      const hasCity = city ? dev.city === city : true;
      const hasEducation = education ? dev.education === education : true;

      return hasSkills && hasCity && hasEducation;
    });
  }

}
