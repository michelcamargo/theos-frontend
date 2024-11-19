import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import { DeveloperListFilter } from '../../types/developer';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-developer-filter',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    NgIf,
  ],
  templateUrl: './developer-filter.component.html',
  styleUrl: './developer-filter.component.scss'
})
export class DeveloperFilterComponent {
  @Input({ required: true }) hasActiveFilters!: boolean;
  @Output() filterChanged = new EventEmitter<DeveloperListFilter>();

  filters = {
    skills: '',
    education: '',
    city: '',
  }

  constructor() {}

  clearFilters() {
    this.filters = {
      skills: '',
      education: '',
      city: '',
    };
    this.onFilterChange();
  }

  onFilterChange() {
    this.filterChanged.emit(this.filters);
  }
}
