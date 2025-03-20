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
  piece_form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DetailTacheFichierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private apiService: ApiService
  ) {
    this.justificatifs = data;
    this.piece_form = this.fb.group({
      reference: this.fb.array([]),
    });
  }

  get refControls(): FormArray {
    return this.piece_form.get('reference') as FormArray;
  }

  addRef(base64: string): void {
    this.refControls.push(this.fb.control(base64));
  }

  removeRef(index: number): void {
    this.refControls.removeAt(index);
  }

  onImageChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.addRef(base64);
      };
      reader.readAsDataURL(file);
    }
  }

  isImage(ref: string): boolean {
    return ref.startsWith('data:image');
  }

  getFileIcon(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'fas fa-file-pdf';
      case 'doc':
      case 'docx':
        return 'fas fa-file-word';
      case 'xls':
      case 'xlsx':
        return 'fas fa-file-excel';
      case 'txt':
        return 'fas fa-file-alt';
      default:
        return 'fas fa-file';
    }
  }

  getFileName(ref: string): string {
    const mimeTypeMatches = ref.match(/^data:(.*);base64,/);
    const mimeType = mimeTypeMatches ? mimeTypeMatches[1] : 'fichier inconnu';
    return `ref_${mimeType.split('/')[1] || 'unknown'}`;
  }

  downloadFile(base64String: string, fileName: string = 'document') {
    const matches = base64String.match(/^data:(.*);base64,(.*)$/);
    if (!matches || matches.length !== 3) {
      console.error('Format de fichier invalide');
      return;
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  previsualise(base64String: string, fileType: string, fileName: string = 'document'): void {
    const matches = base64String.match(/^data:(.*);base64,(.*)$/);
    if (!matches || matches.length !== 3) {
      console.error('Format de fichier invalide');
      return;
    }
    const mimeType = matches[1];
    const base64Data = matches[2];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const fileUrl = URL.createObjectURL(blob);
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`<iframe src="${fileUrl}" width="100%" height="100%"></iframe>`);
    }
  }

  onSubmit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
