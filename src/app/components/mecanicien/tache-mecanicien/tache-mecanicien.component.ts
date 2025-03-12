import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-tache-mecanicien',
  imports: [
    CdkDropList,ReactiveFormsModule,FormsModule,
    CommonModule,LoaderComponent, DragDropModule,
    MatMenuModule, MatIconModule,MatButtonModule,
  ],
  templateUrl: './tache-mecanicien.component.html',
  styleUrl: './tache-mecanicien.component.css'
})
export class TacheMecanicienComponent {
  loader: boolean = false;

  // Structure de données pour les tâches, incluant le nom, véhicule, et description
  columns = [
    { id: 'todo', name: 'To Do', tasks: [{ name: 'Réparer le moteur', vehicle: 'Véhicule 1', description: 'Réparation du moteur principal.' }] },
    { id: 'inProgress', name: 'En Cours', tasks: [{ name: 'Changer les pneus', vehicle: 'Véhicule 2', description: 'Changer les pneus avant.' }] },
    { id: 'waitingForValidation', name: 'Attente de validation', tasks: [{ name: 'ARAt', vehicle: 'Véhicule 3', description: 'Révision du système ARAt.' }] },
    { id: 'done', name: 'Validé', tasks: [{ name: 'ARAt', vehicle: 'Véhicule 3', description: 'Révision du système ARAt.' }] },
  ];

  // Assure que toutes les listes sont bien connectées entre elles
  get connectedDropLists(): string[] {
    return this.columns.map(column => column.id);
  }

  // Modification de la méthode drop pour accepter un tableau d'objets de type tâche
  drop(event: CdkDragDrop<{ name: string, vehicle: string, description: string }[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  viewDetails(task: any) {
    console.log('Détails de la tâche:', task);
  }

  setAs(task: any) {
    console.log('Définir cette tâche comme:', task);
  }
}
