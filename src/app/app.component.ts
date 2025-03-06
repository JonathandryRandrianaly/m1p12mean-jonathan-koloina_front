import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './components/templates/navbar/navbar.component';
import {BreadcrumbComponent} from './components/templates/breadcrumb/breadcrumb.component';
import {BreadcrumbService} from './services/breadcrumb/breadcrumb-service.service';
import {SidebarComponent} from './components/templates/sidebar/sidebar.component';
import {FooterComponent} from './components/templates/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SidebarComponent,BreadcrumbComponent,CommonModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'm1p12mean-jonathan-koloina';
  currentRoute : string = '';
  breadcrumbData: any[] = [];
  routes : any = '';
  private readonly SESSION_KEY = 'sessionActive';

  @HostListener('window:pagehide', ['$event'])
  clearLocalStorage(event: Event) {
    if (!navigator.onLine) {
      sessionStorage.removeItem(this.SESSION_KEY);
    }
  }

  private checkForClosedTabs() {
    if (!sessionStorage.getItem(this.SESSION_KEY)) {
      localStorage.clear();
    }
  }

  ngOnInit() {
    this.checkForClosedTabs();
  }

  constructor(private route : Router, private breadcrumbService: BreadcrumbService){
    this.routes = this.route.events.subscribe(
      (event :any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          this.breadcrumbService.getBreadcrumbData().subscribe(data => {
            this.breadcrumbData = data;
          });
        }
      }
    )
  }
}
