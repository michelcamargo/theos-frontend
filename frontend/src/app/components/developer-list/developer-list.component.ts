import {Component, Input, OnInit} from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CustomUser } from '../../models/custom-user.model';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { LoadingFeedbackComponent } from '../loading-feedback/loading-feedback.component';
import { AvatarFallbackDirective } from '../../directives/fallback.directive';
import ValidatorsHelper from '../../helpers/validators.helper';

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
    LoadingFeedbackComponent,
    NgStyle,
    AvatarFallbackDirective,
  ],
  templateUrl: './developer-list.component.html',
  styleUrl: './developer-list.component.scss'
})
export class DeveloperListComponent implements OnInit {
  @Input({ required: true }) items!: CustomUser[];
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) hasActiveFilters!: boolean;

  constructor() {}

  isValidGithubUrl(url: string) {
    return Boolean(url) && ValidatorsHelper.isValidUrl(url) && url.includes('github.com')
  }

  developerSelectionHandler(selectedDeveloper: CustomUser) {
    if (this.isValidGithubUrl(selectedDeveloper.githubUrl)) {
      window.open(selectedDeveloper.githubUrl, '_blank');
    }
  }

  ngOnInit() {}

  protected readonly ValidatorsHelper = ValidatorsHelper;
}
