import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { GithubAuthComponent } from '../../github-auth/github-auth.component';
import { CustomUser } from '../../../models/custom-user.model';
import {NgForOf, NgIf} from '@angular/common';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import {
  NameAutocompleteFieldComponent
} from '../name-autocomplete-field/name-autocomplete-field.component';
import { FieldAutocompleteIndex } from '../../../types/form';

@Component({
  selector: 'form-step-personal',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    GithubAuthComponent,
    NgIf,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption,
    NgForOf,
    NameAutocompleteFieldComponent
  ],
  templateUrl: './form-step-personal.component.html',
  styleUrl: '../developer-form.component.scss'
})
export class FormStepPersonalComponent {
  @Input({ required: true }) formRef!: FormGroup;
  @Input() partialProfile?: Partial<CustomUser>;
  @Input({ required: true }) isDebouncing: boolean = false;
  @Input({ required: true }) autocompleteSuggestions: Partial<CustomUser>[] = [];
  @Output() autocompleteHandler: EventEmitter<FieldAutocompleteIndex> = new EventEmitter<FieldAutocompleteIndex>();

  constructor() {}

  isAuthenticated() {
    return !!this.partialProfile;
  }

  handleAutocompleteUpdate(event: FieldAutocompleteIndex): void {
    this.autocompleteHandler.emit(event)
  }

}
