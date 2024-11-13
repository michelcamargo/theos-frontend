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
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeveloperFormComponent, DeveloperFilterComponent, DeveloperListComponent, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  userList: Observable<CustomUser[]> = of([]);
  filteredUsers: CustomUser[] = [];
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
      }
    });

    dialogRef.afterClosed().subscribe((user: CustomUser) => {
      if (!user) {
        this.showError('Usuário não cadastrado.');
        return;
      }

      dialogRef.close();
      this.loadUsers();
    });
  }

  runQueryParamAuthentication() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.getAuthUser(code).subscribe({
          next: (authUser) => {
            console.log({ authUser });
            this.showSuccess('Autenticado');
            this.authenticatedUser = authUser;
          },
          error: (error) => {
            console.error('Erro ao obter usuário autenticado:', error);
            this.showError('Token inválido, faça login novamente.');
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
    this.loadUsers();
  }

  loadUsers() {
    this.userList = this.usersService.getUsers();
    this.userList.subscribe((users: CustomUser[]) => {
      this.filteredUsers = [...users];
    });
  }

  onFilterChanged(filter: { skills?: string[]; city?: string; education?: string }): void {
    this.userList.subscribe((users: CustomUser[]) => {
      this.filteredUsers = users.filter(developer =>
        (!filter.skills || filter.skills.every(skill => developer.skills.includes(skill))) &&
        (!filter.city || developer.city.includes(filter.city)) &&
        (!filter.education || developer.education.includes(filter.education))
      );
    });
  }
}
