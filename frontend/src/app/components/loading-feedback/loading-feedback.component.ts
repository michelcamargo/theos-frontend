import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'loading-feedback',
  templateUrl: './loading-feedback.component.html',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  styleUrl: './loading-feedback.component.scss'
})
export class LoadingFeedbackComponent {
  @Input() diameter: number = 42;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  constructor() {}
}
