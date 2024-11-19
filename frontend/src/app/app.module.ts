import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AvatarFallbackDirective } from './directives/fallback.directive';

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AvatarFallbackDirective,
  ],
  exports:[AvatarFallbackDirective]
})
export class AppModule { }
