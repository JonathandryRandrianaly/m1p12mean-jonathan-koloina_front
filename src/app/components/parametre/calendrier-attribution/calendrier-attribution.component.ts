import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatOption, MatSelect} from '@angular/material/select';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-calendrier-attribution',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTooltipModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatCheckbox,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef
  ],
  templateUrl: './calendrier-attribution.component.html',
  styleUrl: './calendrier-attribution.component.css'
})
export class CalendrierAttributionComponent {
  loading: boolean = false;
  error: boolean = false;
  task_form: FormGroup;
  employeeArray: FormArray;
  employees: any[] = [];
  filteredEmployees: any[] = [...this.employees];
  searchControl: FormControl;
  displayedColumns: string[] = ['name', 'specialization','disponibilité', 'select'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CalendrierAttributionComponent>,
    @Inject(MAT_DIALOG_DATA) public task: any,
    private apiService: ApiService
  ) {
      this.loadMecaniciens();
      this.searchControl = new FormControl('');
      this.task_form = this.fb.group({
        employee: this.fb.array([])  
      });
      this.employeeArray = this.task_form.get('employee') as FormArray;

    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filterEmployees(searchText); 
    });
  }

  toggleEmployeeSelection(employeeId: string, event: any) {
    if (event.checked) {
      this.employeeArray.push(new FormControl(employeeId)); 
    } else {
      const index = this.employeeArray.controls.findIndex(ctrl => ctrl.value === employeeId);
      if (index >= 0) {
        this.employeeArray.removeAt(index); 
      }
    }
  }
  

  filterEmployees(searchText: string = '') {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.user.nom.toLowerCase().includes(searchText.toLowerCase())
    );

    this.filteredEmployees.forEach(employee => {
      const isSelected = this.employeeArray.controls.some(ctrl => ctrl.value === employee.user._id);
      employee.isSelected = isSelected;  
    });
  }

  loadMecaniciens() {
    this.apiService.getAll(`api/entretien/mecaniciens/${this.task.detailEntretienId}`).then(
      (response) => {
        this.employees = response;
        this.filteredEmployees = [...this.employees];  
      },
      (error) => {
        console.error('Erreur lors de loadMecaniciens :', error);
      }
    );
  }
  

  onSubmit() {
    if (this.task_form.valid) {
      const values = {
        usersId: this.task_form.value.employee, 
        detailEntretienId: this.task.detailEntretienId  
      };
       this.apiService.insert('api/entretien/mecanicien/assigner', values).then(
          (response) => {
            alert('Assignation effectué');
          },
          (error) => {
            console.error('Erreur lors de l\'insertion :', error);
          }
        );
      this.dialogRef.close(this.task_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
