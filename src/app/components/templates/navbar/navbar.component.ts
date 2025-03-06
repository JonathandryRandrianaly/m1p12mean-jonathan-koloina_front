import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {NavbarService} from '../../../services/navbar/navbar-service.service';
import {AuthService} from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentActive : boolean = false;
  username: string = '';

  constructor(private navbarService: NavbarService, private authService: AuthService,private router: Router) {
    const username = this.authService.getUsername();
    this.username = username ?? 'Invité';
  }

  getSideBarState(){
    return this.navbarService.getActive();
  }

  navigate(nav : string){
    this.router.navigate([nav]);
    this.navbarService.setActive(false);
  }
  toggleActive() {
    this.navbarService.setActive(!this.currentActive);
    this.currentActive = this.navbarService.getActive();
  }

  logout() {
    this.authService.logout();
  }
}
