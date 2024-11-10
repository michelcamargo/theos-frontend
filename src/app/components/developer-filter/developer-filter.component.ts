import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';

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
  @Output() filterChanged = new EventEmitter<{ skills: string[], education: string, city: string }>();

  skillsInput: string = '';
  education: string = '';
  city: string = '';

  onFilterChange(): void {
    const skillsArray = this.skillsInput.split(',').map(skill => skill.trim());
    this.filterChanged.emit({
      skills: skillsArray,
      education: this.education,
      city: this.city
    });
  }
}
