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
import {ApiService} from '../../../services/api/api.service';

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
    { id: '-10', name: 'A faire', tasks: [] as any[] },
    { id: '0', name: 'En Cours', tasks: [] as any[] },
    { id: '10', name: 'Attente de validation', tasks: [] as any[] },
    { id: '20', name: 'Validé', tasks: [] as any[] }
  ];

  rowData: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router,private dialog: MatDialog, private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        const dateFromUrl = new Date(params['date']);
        this.selectedDateString = dateFromUrl.toISOString().split('T')[0];
        this.selectedDate = dateFromUrl;
        this.loadEntretienDetails();
      }
    });
  }

  onDateChange(): void {
    if (this.selectedDateString) {
      this.selectedDate = new Date(this.selectedDateString);
      this.loadEntretienDetails();
    }
  }

  get connectedDropLists(): string[] {
    return this.columns.map(column => column.id);
  }

  drop(event: CdkDragDrop<{ id: string, name: string, vehicle: string, description: string, etatCode: number }[]>) {
    const taskMoved = event.previousContainer.data[event.previousIndex];
    if(taskMoved.etatCode != 20){
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        const task = event.previousContainer.data[event.previousIndex];
        const newStatus = event.container.id;
        task.etatCode = Number(newStatus);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.apiService.insert('api/entretien/update-status', {
          detailEntretienId: task.id,
          etatCode: Number(newStatus),
          etatLibelle: this.getEtatLibelle(Number(newStatus))
        }).then(response => {
          console.log(response);
        }).catch(error => {
          console.error('Erreur lors de la mise à jour du statut:', error);
        });
      }
    }
  }

  getEtatLibelle(etatCode: number): string {
    switch (etatCode) {
      case -10: return 'A faire';
      case 0: return 'En Cours';
      case 10: return 'Attente de validation';
      case 20: return 'Validé';
      default: return 'Inconnu';
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
          this.loadEntretienDetails();
      }
    });
  }

  loadEntretienDetails(){
    this.loader = true;
    if (!this.selectedDate) {
      this.selectedDate = new Date();
    }
    let dateUTC = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
    const formData = {
      date: dateUTC.toISOString()
    };
    this.apiService.getAll('api/entretiens/detail/'+dateUTC.toISOString()).then(
      (response:any[]) => {
        this.rowData = response;
        this.columns.forEach(column => column.tasks = []);
        this.rowData.forEach(item => {
          const task: any = {
            id: item._id,
            nom: item.typeEntretien?.nom || 'Type inconnu',
            vehicule: `${item.entretien.vehicule.modele.marque.nom} ${item.entretien.vehicule.modele.nom} (${item.entretien.vehicule.immatriculation})`,
            description: item.typeEntretien?.description || 'Pas de description',
            assignedCount: item.users.length,
            etatCode: item.etat.code
          };

          if (task.etatCode === -10) {
            this.columns[0].tasks.push(task);
          } else if (task.etatCode === 0) {
            this.columns[1].tasks.push(task);
          } else if (task.etatCode === 10) {
            this.columns[2].tasks.push(task);
          }else if (task.etatCode === 20) {
            this.columns[3].tasks.push(task);
          }
        });

        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadUsers :', error);
      }
    );
  }

}
