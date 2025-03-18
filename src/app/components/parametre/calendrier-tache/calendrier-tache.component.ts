import {Component} from '@angular/core';
import {CalendarEvent, CalendarModule, CalendarMonthViewDay} from 'angular-calendar';
import {DatePipe} from '@angular/common';

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

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  // Méthode pour aller au mois suivant
  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }

  // Méthode pour récupérer la date sélectionnée
  onDayClick(event: { day: CalendarMonthViewDay; sourceEvent: MouseEvent | KeyboardEvent }): void {
    console.log('Date sélectionnée :', event.day.date);
    alert(`Date sélectionnée : ${event.day.date.toDateString()}`);
  }

  // Gestion des événements
  handleEvent(eventData: { event: CalendarEvent; sourceEvent: MouseEvent | KeyboardEvent }): void {
    console.log('Événement cliqué', eventData.event);
  }
}
