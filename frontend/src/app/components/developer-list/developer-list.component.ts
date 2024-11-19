import {Component, Input, OnInit} from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CustomUser } from '../../models/custom-user.model';
import { NgForOf, NgIf } from '@angular/common';
import {LoadingFeedbackComponent} from '../loading-feedback/loading-feedback.component';

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
    NgForOf,
    LoadingFeedbackComponent
  ],
  templateUrl: './developer-list.component.html',
  styleUrl: './developer-list.component.scss'
})
export class DeveloperListComponent implements OnInit {
  @Input({ required: true }) items!: CustomUser[];
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) hasActiveFilters!: boolean;

  constructor() {}

  ngOnInit() {}
}
