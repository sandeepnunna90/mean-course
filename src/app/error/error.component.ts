import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  // special type of injection concept to recive the data from intercpetor
  // Lecture - 125 (adding error dialog) for more info
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}
