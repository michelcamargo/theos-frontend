import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { GithubAuthComponent } from '../../github-auth/github-auth.component';
import { CustomUser } from '../../../models/custom-user.model';
import {NgForOf, NgIf} from '@angular/common';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import {UsersService} from '../../../services/users.service';

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
    NgForOf
  ],
  templateUrl: './form-step-personal.component.html',
  styleUrl: '../developer-form.component.scss'
})
export class FormStepPersonalComponent {
  @Input({ required: true }) formRef!: FormGroup;
  @Input() partialProfile?: Partial<CustomUser>;
  @Input() autoCompleteSetup!: Function;
  @Input() isDebouncing: boolean = false;
  @Input() filteredUsers: any[] = [];
  @Output() loadNextPage: EventEmitter<void> = new EventEmitter<void>();

  isAuthenticated: boolean = Boolean(this.partialProfile);

  constructor() {}

  fieldFocusHandler(inputName: string): void {
    this.autoCompleteSetup(inputName);
    // this.filteredUsers = [];
    // this.loadUsers();
  }

  selectedOptionHandler(event: any) {
    const selectedUser = event.option.value;
    this.formRef.get('name')?.setValue(selectedUser);
  }

  onScroll() {
    this.loadNextPage.emit();
  }

}
