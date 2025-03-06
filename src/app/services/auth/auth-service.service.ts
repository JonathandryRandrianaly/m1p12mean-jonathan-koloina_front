import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/connexion']);
  }

  isLoggedIn() {
    let stt :boolean = false;
    if (localStorage.getItem('token')) {
      stt =  true;
    }else{
      this.router.navigate(['connexion']);
    }
    return stt;
  }
  hasRole(vary: string): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload && payload.roles) {
        return payload.roles.includes(vary);
      }
    }
    return false;
  }
  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload && payload.roles) {
        return payload.roles;
      }
    }
    return null;
  }
  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload && payload.username) {
        localStorage.setItem('username', payload.username);
        return payload.username;
      }
    }
    return null;
  }
    
}
