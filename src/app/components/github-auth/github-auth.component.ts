import {Component, Input} from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatButton } from '@angular/material/button';
import {CustomUser} from '../../models/custom-user.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-github-auth',
  standalone: true,
  imports: [
    MatButton,
    NgIf
  ],
  templateUrl: './github-auth.component.html',
  styleUrl: './github-auth.component.scss'
})
export class GithubAuthComponent {
  @Input() isAuthenticated: boolean = false;
  @Input() partialProfile?: Partial<CustomUser>;

  constructor() { }

  githubAccountLoginHandler() {
    const { githubClientId, appUrl } = environment;

    window.location.href = `${environment.githubUrl}/authorize?client_id=${githubClientId}&redirect_uri=${appUrl}&scope=user:email`;
  }
}
