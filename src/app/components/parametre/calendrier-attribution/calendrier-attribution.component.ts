import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
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
  employees: any[] = [
    { id: 1, name: 'John Doe', tasksAssigned: 5, specialization: 'Mécanicien' },
    { id: 2, name: 'Jane Smith', tasksAssigned: 3, specialization: 'Carrossier' },
    { id: 3, name: 'Paul Johnson', tasksAssigned: 8, specialization: 'Électricien' },
    { id: 4, name: 'Anna Brown', tasksAssigned: 2, specialization: 'Peintre' },
    { id: 5, name: 'Lucy Davis', tasksAssigned: 6, specialization: 'Mécanicien' },
  ];
  filteredEmployees: any[] = [...this.employees];
  searchControl: FormControl;
  displayedColumns: string[] = ['name', 'tasksAssigned', 'specialization', 'select'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CalendrierAttributionComponent>
  ) {
    this.searchControl = new FormControl('');
    this.task_form = this.fb.group({
      employee: this.fb.array([])  // Initialise FormArray pour gérer la sélection des employés
    });
    this.employeeArray = this.task_form.get('employee') as FormArray;

    // Écouter les changements de la valeur de recherche
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filterEmployees(searchText);  // Appliquez le filtrage sur la liste des employés
    });
  }

  // Méthode pour gérer la sélection ou désélection des employés
  toggleEmployeeSelection(employeeId: number, event: any) {
    if (event.checked) {
      // Ajouter l'employé sélectionné au FormArray
      this.employeeArray.push(new FormControl(employeeId));  // Utilisation de FormControl pour ajouter un employé
    } else {
      // Trouver l'index de l'employé à retirer et le supprimer
      const index = this.employeeArray.controls.findIndex(ctrl => ctrl.value === employeeId);
      if (index >= 0) {
        this.employeeArray.removeAt(index);  // Supprimer l'employé du FormArray
      }
    }
  }

  // Filtrer la liste des employés en fonction de la recherche
  filterEmployees(searchText: string = '') {
    // Filtrer les employés en fonction de la recherche
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Rechercher les employés déjà sélectionnés et cocher leur case
    this.filteredEmployees.forEach(employee => {
      const isSelected = this.employeeArray.controls.some(ctrl => ctrl.value === employee.id);
      employee.isSelected = isSelected;  // Ajouter une propriété pour indiquer si l'employé est sélectionné
    });
  }

  onSubmit() {
    if (this.task_form.valid) {
      this.dialogRef.close(this.task_form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
