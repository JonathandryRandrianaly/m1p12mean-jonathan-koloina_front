import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../services/api/api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import { Router } from '@angular/router';

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
  rapportId: any;
  detailId: any;
  piece_form!: FormGroup;
  backendUrl = 'http://localhost:5000/uploads/';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DetailTacheFichierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private router: Router
  ) {
    this.justificatifs = data?.rapport?.justificatifs;
    this.rapportId= data?.rapport?._id;
    this.detailId = data?.detailId;
    this.piece_form = this.fb.group({
      reference: this.fb.array([]),
    });
  }

  get refControls(): FormArray {
    return this.piece_form.get('reference') as FormArray;
  }

  addRef(fileName: string): void {
    this.refControls.push(this.fb.control(fileName));
  }

  removeRef(index: number): void {
    this.refControls.removeAt(index);
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
          this.dialogRef.close();
          console.error('Erreur lors de l\'insertion :', error);
        }
      );
  }

  onImageChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);


    }
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

  onSubmit(): void {
    console.log('Formulaire soumis avec:', this.piece_form.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
