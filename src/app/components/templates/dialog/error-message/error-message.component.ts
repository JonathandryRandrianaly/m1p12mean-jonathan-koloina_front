import {AfterViewInit, Component, Inject} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [MatIcon, MatIconButton, MatTooltip],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent{
  constructor(
    public snackBarRef: MatSnackBarRef<ErrorMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string }
  ) {}

  closeSnackbar() {
    this.snackBarRef.dismiss();
  }
}
