import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatAutocomplete, MatOption} from '@angular/material/autocomplete';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FieldAutocompleteIndex} from '../../../types/form';
import {LoadingFeedbackComponent} from '../../loading-feedback/loading-feedback.component';

@Component({
  selector: 'name-autocomplete-field',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    NgForOf,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    LoadingFeedbackComponent
  ],
  templateUrl: './name-autocomplete-field.component.html',
  styleUrl: './name-autocomplete-field.component.scss'
})
export class NameAutocompleteFieldComponent implements OnInit {
  @Output() autocompleteSetter = new EventEmitter<FieldAutocompleteIndex>();
  @Output() selectedOption = new EventEmitter<any>();
  @Input() formGroup!: FormGroup;
  @Input() isLoading!: boolean;

  filteredUsers: any[] = [];
  currentPage: number = 1;
  autoCompleteIndexes: FieldAutocompleteIndex[] = [
    { field: 'name', page: 1, debounceTime: 2000 },
  ];

  constructor() {}

  updateAutocomplete(field: string): void {
    this.autocompleteSetter.emit({
      field, page: this.currentPage,
    });
  }

  fieldFocusHandler(field: string): void {
    this.updateAutocomplete(field);
  }

  selectedOptionHandler(event: any) {
    console.log({ eventoSelectedOption: event })

    const selectedUser = event.option.value;

    if (!selectedUser) return;

    this.selectedOption.emit({
      selectedUser,
    });
  }

  loadNextPage(field: string = 'name') {
    const autocompleteInfo = this.autoCompleteIndexes.find(item => item.field === field)
    if (autocompleteInfo) {
      autocompleteInfo.page++;
      this.updateAutocomplete(field);
    }
  }

  onScroll() {
    this.loadNextPage();
  }

  ngOnInit() {}
}
