import {Component} from '@angular/core';
import {CalendarEvent, CalendarModule, CalendarMonthViewDay} from 'angular-calendar';
import {DatePipe, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';
import {LoaderComponent} from '../../templates/loader/loader.component';

@Component({
  selector: 'app-calendrier-tache',
  imports: [
    CalendarModule,
    DatePipe,
    LoaderComponent,
    NgIf
  ],
  templateUrl: './calendrier-tache.component.html',
  styleUrl: './calendrier-tache.component.css'
})
export class CalendrierTacheComponent {
  loader: boolean = false;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    const currentMonth = new Date().getMonth() + 1;
    this.loadEvents(currentMonth);
  }

  loadEvents(month: number) {
    this.loader = true;
    this.apiService.getAll('api/entretiens/month/'+month).then(
      (response:any[]) => {
        this.events = response.map((entretien) => ({
          start: new Date(entretien.date),
          title: entretien.vehicule.immatriculation
        }));
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        console.error('Erreur lors de loadUsers :', error);
      }
    );
  }

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
    this.loadEvents(this.viewDate.getMonth()+1);
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
    this.loadEvents(this.viewDate.getMonth()+1);
  }

  onDayClick(event: { day: CalendarMonthViewDay; sourceEvent: MouseEvent | KeyboardEvent }): void {
    const selectedDate = event.day.date;
    const dateUTC = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
    this.router.navigate(['/calendrier-detail'], {
      queryParams: { date: dateUTC.toISOString() }
    });
  }

  handleEvent(eventData: { event: CalendarEvent; sourceEvent: MouseEvent | KeyboardEvent }): void {
    console.log('Événement cliqué', eventData.event);
  }
}
