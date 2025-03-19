import {Component} from '@angular/core';

interface Report {
  label: string;
  price?: number;
  fileUrl?: string;
}

@Component({
  selector: 'app-detail-tache',
  imports: [],
  templateUrl: './detail-tache.component.html',
  styleUrl: './detail-tache.component.css'
})
export class DetailTacheComponent {
}
