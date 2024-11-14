import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {DeveloperFilter} from '../../types/developer';

@Component({
  selector: 'app-developer-filter',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './developer-filter.component.html',
  styleUrl: './developer-filter.component.scss'
})
export class DeveloperFilterComponent {
  @Output() filterChanged = new EventEmitter<DeveloperFilter>();

  skills: string = '';
  education: string = '';
  city: string = '';

  onFilterChange(): void {
    this.filterChanged.emit({
      skills: this.skills,
      education: this.education,
      city: this.city
    });
  }
}
