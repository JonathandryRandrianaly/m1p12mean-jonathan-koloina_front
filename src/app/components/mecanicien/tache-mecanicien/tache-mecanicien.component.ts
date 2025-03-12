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
  searchQuery: string = '';

  columns = [
    { id: 'todo', name: 'To Do', tasks: [
        { name: 'Réparer le moteur', vehicle: 'Vehicule 1', description: 'Tâche de réparation' },
        { name: 'Changer les pneus', vehicle: 'Vehicule 2', description: 'Changer les pneus avant' }
      ]
    },
    { id: 'inProgress', name: 'En Cours', tasks: [
        { name: 'Réparer la carrosserie', vehicle: 'Vehicule 3', description: 'Réparer les rayures sur la carrosserie' }
      ]
    },
    { id: 'done', name: 'Terminé', tasks: [
        { name: 'Changement d’huile', vehicle: 'Vehicule 4', description: 'Vidange de moteur' }
      ]
    }
  ];

  get connectedDropLists(): string[] {
    return this.columns.map(column => column.id);
  }

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
