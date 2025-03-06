import { CommonModule,Location } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule,CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent  implements OnInit {
  @Input() data: { label: string, url: string }[] = [];

  constructor(private location: Location) {}

  isMobile = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.onResize();
  }
}
