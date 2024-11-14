import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
})
export class AppModule { }
