import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from '../../templates/loader/loader.component';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ApiService} from '../../../services/api/api.service';
import {CalendrierAttributionComponent} from '../../parametre/calendrier-attribution/calendrier-attribution.component';
import {AuthService} from '../../../services/auth/auth-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessageComponent} from '../../templates/dialog/error-message/error-message.component';
import {InfoMessageComponent} from '../../templates/dialog/info-message/info-message.component';

@Component({
  selector: 'app-tache-mecanicien',
  imports: [
    CdkDropList,ReactiveFormsModule,FormsModule,
    CommonModule,LoaderComponent, DragDropModule,
    MatMenuModule, MatIconModule,MatButtonModule
  ],
  templateUrl: './tache-mecanicien.component.html',
  styleUrl: './tache-mecanicien.component.css'
})
export class TacheMecanicienComponent {
  loader: boolean = false;
  searchQuery: string = '';
  selectedDate: Date | null = null;
  selectedDateString: string = '';
  userConnected: string|null = null;

  columns = [
    { id: '-10', name: 'A faire', tasks: [] as any[] },
    { id: '0', name: 'En Cours', tasks: [] as any[] },
    { id: '10', name: 'Attente de validation', tasks: [] as any[] },
    { id: '20', name: 'Validé', tasks: [] as any[] }
  ];

  rowData: any[] = [];

  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router,private dialog: MatDialog, private apiService: ApiService, private  authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.getConnectedUser().then(user => {
      this.userConnected = user;
      const dateFromUrl = new Date();
      this.selectedDateString = dateFromUrl.toISOString().split('T')[0];
      this.selectedDate = dateFromUrl;
      this.loadEntretienDetails();
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
    if (event.container.id != '20' && taskMoved.etatCode != 20) {
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
        }).catch(error => {
          this.showErrorMessage(error.response.data.message);
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
    this.router.navigate(['/tache', task.id]);
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
    this.apiService.getAll('api/entretiens/detail-personnel/'+dateUTC.toISOString()+'/'+this.userConnected).then(
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
        this.showErrorMessage(error.response.data.message);
        this.loader = false;
      }
    );
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
