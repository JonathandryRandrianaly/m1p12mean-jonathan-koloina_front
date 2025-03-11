import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private navbarService: NavbarService,private authService: AuthService,private router: Router) {
    this.subscription = new Subscription();
  }

  navigate(nav : string){
    this.router.navigate([nav]);
    this.navbarService.setActive(false);
  }

  ngOnInit(): void {
    this.isManager$ = this.authService.hasRole('manager');
    this.subscription.add(this.navbarService.isActive$.subscribe(isActive => {
      this.isActive = isActive;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

