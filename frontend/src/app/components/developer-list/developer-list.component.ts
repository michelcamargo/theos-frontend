import {Component, Input, OnInit} from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CustomUser } from '../../models/custom-user.model';
import { NgForOf, NgIf } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-developer-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatIcon,
    NgIf,
    NgForOf
  ],
  templateUrl: './developer-list.component.html',
  styleUrl: './developer-list.component.scss'
})
export class DeveloperListComponent implements OnInit {
  @Input() userList: CustomUser[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.userList = data;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      },
      complete: () => {
        console.log('finished')
      }
    })
  }
}
