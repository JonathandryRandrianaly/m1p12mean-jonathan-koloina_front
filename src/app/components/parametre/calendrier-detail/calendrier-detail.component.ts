import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendrierAttributionComponent} from '../calendrier-attribution/calendrier-attribution.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-calendrier-detail',
  imports: [
    CdkDropList,ReactiveFormsModule,FormsModule,
    CommonModule,LoaderComponent, DragDropModule,
    MatMenuModule, MatIconModule,MatButtonModule],
  templateUrl: './calendrier-detail.component.html',
  styleUrl: './calendrier-detail.component.css'
})
export class CalendrierDetailComponent implements OnInit {
  loader: boolean = false;
  searchQuery: string = '';
  selectedDate: Date | null = null;
  selectedDateString: string = '';

  columns = [
    { id: 'todo', name: 'To Do', tasks: [
        {detailEntretienId: '67d94ec480bc60b3223a4a41',  name: 'Réparer le moteur', vehicle: 'Vehicule 1', description: 'Tâche de réparation' },
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

  constructor(private route: ActivatedRoute, private router: Router,private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        const dateFromUrl = new Date(params['date']);
        this.selectedDateString = dateFromUrl.toISOString().split('T')[0];
        this.selectedDate = dateFromUrl;
      }
    });
  }

  onDateChange(): void {
    if (this.selectedDateString) {
      this.selectedDate = new Date(this.selectedDateString);
    }
  }

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
  setTaskTo(task: any) {
    const dialogRef = this.dialog.open(CalendrierAttributionComponent, {
      width: '800px',
      disableClose: true,
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

}
