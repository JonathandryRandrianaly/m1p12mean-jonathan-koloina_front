import {Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {NavbarService} from '../../../services/navbar/navbar-service.service';
import {AuthService} from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  isActive: boolean = false;
  private subscription: Subscription;
  isManager$!: Promise<boolean>;
  isMecanicien$!: Promise<boolean>;
  isClient$!: Promise<boolean>;
  @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;

  constructor(private navbarService: NavbarService,private authService: AuthService,private router: Router) {
    this.subscription = new Subscription();
  }

  navigate(nav : string){
    this.router.navigate([nav]);
    this.navbarService.setActive(false);
  }

  ngOnInit(): void {
    this.isManager$ = this.authService.hasRole('manager');
    this.isClient$ = this.authService.hasRole('client');
    this.isMecanicien$ = this.authService.hasRole('mecanicien');
    this.subscription.add(this.navbarService.isActive$.subscribe(isActive => {
      this.isActive = isActive;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.sidebar && !this.sidebar.nativeElement.contains(event.target as Node)) {
      this.navbarService.setActive(false);
    }
  }
}

