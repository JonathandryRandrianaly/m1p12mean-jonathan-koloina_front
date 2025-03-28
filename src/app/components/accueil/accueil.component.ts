import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit{
  
  userConnected: string|null = null;

  constructor(private router: Router, private authService: AuthService){

  }

  ngOnInit(){
    this.authService.getConnectedUser().then(user => {
      this.userConnected = user;
    });
  }

  profil(){
    this.router.navigate(['/accueil/profil', this.userConnected]);
  }

}
