import {Component} from '@angular/core';
import {CalendarEvent, CalendarModule, CalendarMonthViewDay} from 'angular-calendar';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api/api.service';

@Component({
  selector: 'app-calendrier-tache',
  imports: [
    CalendarModule,
    DatePipe
  ],
  templateUrl: './calendrier-tache.component.html',
  styleUrl: './calendrier-tache.component.css'
})
export class CalendrierTacheComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Un événement',
    },
  ];

  constructor(private router: Router, private apiService: ApiService) {
  }

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
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
