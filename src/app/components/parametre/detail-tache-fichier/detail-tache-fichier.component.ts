import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../services/api/api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';

@Component({
  selector: 'app-detail-tache-fichier',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTooltipModule,
    MatIcon
  ],
  templateUrl: './detail-tache-fichier.component.html',
  styleUrl: './detail-tache-fichier.component.css'
})
export class DetailTacheFichierComponent {
  loading: boolean = false;
  error: boolean = false;
  justificatifs: any[] = [];
  newJustificatifs: any[] = [];
  rapportId: any;
  detailId: any;
  piece_form!: FormGroup;
  backendUrl = 'http://localhost:5000/uploads/';
  justificatifs_form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DetailTacheFichierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private router: Router
  ) {
    this.justificatifs = data?.rapport?.justificatifs;
    this.rapportId= data?.rapport?._id;
    this.detailId = data?.detailId;
    this.justificatifs_form = this.fb.group({
      rapportId: [data?.rapport?._id, Validators.required],
      justificatifs: [null, Validators.required]
    });
  }

  getFullImagePath(filePath: string): string {
    return `${this.backendUrl}${filePath}`;
  }

  removeFile(fileId: any) {
    const value= {
      rapportId: this.rapportId,
      fileId: fileId
    }
      this.apiService.insert('api/entretien/rapport/remove-fichier', value).then(
        (response) => {
          this.justificatifs = this.justificatifs.filter(file => file._id !== fileId);
          this.dialogRef.close(true);
        },
        (error) => {
          this.showErrorMessage(error.response.data.message);
          this.dialogRef.close();
        }
      );
  }

  isImage(fileName: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(fileName);
  }

getFileIcon(filename: string): string {
  if (filename.endsWith('.pdf')) {
    return 'picture_as_pdf';
  } else if (filename.endsWith('.doc') || filename.endsWith('.docx')) {
    return 'description';
  } else if (filename.endsWith('.xls') || filename.endsWith('.xlsx')) {
    return 'table_chart';
  } else if (filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
    return 'image';
  } else {
    return 'insert_drive_file';
  }
}

  downloadFile(fileName: string): void {
    window.open(this.getFullImagePath(fileName), '_blank');
  }

  previsualise(fileName: string): void {
    const fileUrl = this.getFullImagePath(fileName);
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`<iframe src="${fileUrl}" width="100%" height="100%"></iframe>`);
    }
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      this.newJustificatifs = Array.from(files);
    }
  }

  removeNewFile(name: any){
    this.newJustificatifs = this.newJustificatifs.filter(file => file.name !== name);
  }

  addJustificatifs() {
    const formData = new FormData();
    formData.append('rapportId', this.justificatifs_form.value.rapportId);
    this.newJustificatifs.forEach((file) => {
      formData.append('justificatifs', file);
    });

      this.apiService.import('api/entretien/rapport/justificatifs', formData).then(
        (response) => {
          const success= response.data;
          if(success === true){
            alert('Ajout effectué');
            this.justificatifs = [...this.justificatifs, ...this.newJustificatifs];
          }
          this.justificatifs_form = this.fb.group({
            rapportId: [this.rapportId, Validators.required],
            justificatifs: [null, Validators.required]
          });
          this.dialogRef.close(true);
        },
        (error) => {
          this.showErrorMessage(error.response.data.message);
        }
      );
  }

  onSubmit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  showErrorMessage(message: string) {
    this.snackBar.openFromComponent(ErrorMessageComponent, {
      data: { message },
      duration: 3000,
      panelClass: ['custom-snackbar-panel'],
    });
  }

  showAlertMessage(message: string) {
    this.snackBar.openFromComponent(InfoMessageComponent, {
      data: { message },
      duration: 3000,
      panelClass: ['custom-snackbar-panel'],
    });
  }
}
