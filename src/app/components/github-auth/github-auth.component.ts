import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-github-auth',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './github-auth.component.html',
  styleUrl: './github-auth.component.scss'
})
export class GithubAuthComponent {
  constructor() { }

  githubAccountLoginHandler() {
    const clientId = 'SEU_CLIENT_ID';
    const redirectUri = 'http://localhost:4200/';

    window.location.href = `${environment.githubUrl}/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
  }
}
