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
  availableDevelopers: CustomUser[] = [];
  developerList: CustomUser[] = [];
  authenticatedUser?: CustomUser = undefined;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private usersService: UsersService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  showError(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  openUserFormDialog() {
    const dialogRef = this.dialog.open(DeveloperFormComponent, {
      width: '435px',
      data: {
        partialProfile: this.authenticatedUser,
      },
      hasBackdrop: true,
    });

    dialogRef.componentInstance.developerAdded.subscribe((user: CustomUser) => {
      if (user) {
        this.developerList.push(user);
        this.showSuccess('Desenvolvedor adicionado à lista.')
        dialogRef.close();
      }
    });

    dialogRef.afterClosed().subscribe((user: CustomUser) => {
      if (!user) {
        this.showError('Formulário .');
        return;
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
    this.runQueryParamAuthentication();
  }

  filterChangeHandler({ skills, city, education }: DeveloperFilter): void {
    this.developerList = this.availableDevelopers.filter(dev => {
      const hasSkills = skills ? skills.split(',').every(skill => dev.skills.includes(skill.trim())) : true;
      const hasCity = city ? dev.city === city : true;
      const hasEducation = education ? dev.education === education : true;

      return hasSkills && hasCity && hasEducation;
    });
  }

}
