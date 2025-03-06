import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private apiService: ApiService) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/connexion-client']);
  }

  isLoggedIn() {
    let stt :boolean = false;
    if (localStorage.getItem('token')) {
      stt =  true;
    }else{
      this.router.navigate(['connexion-client']);
    }
    return stt;
  }
  decodeToken(): Promise<any> {
    return this.apiService.getAll('api/decodeToken')
      .then(
        (response) => {
          return response;
        },
        (error) => {
          console.log(error);
          return null;
        }
      );
  }

  async hasRole(vary: string): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = await this.decodeToken();
      if (payload && payload.roles) {
        return payload.roles.includes(vary);
      }
    }
    return false;
  }

}
