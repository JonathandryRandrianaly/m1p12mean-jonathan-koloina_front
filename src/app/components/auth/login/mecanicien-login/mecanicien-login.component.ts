import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserDto} from '../../../../dto/UserDto';
import {Router} from '@angular/router';
import {ApiService} from '../../../../services/api/api.service';
import axios from 'axios';

@Component({
  selector: 'app-mecanicien-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './mecanicien-login.component.html',
  styleUrl: './mecanicien-login.component.css'
})
export class MecanicienLoginComponent implements OnInit {
  error: boolean = false;
  loading: boolean = false;
  usr: UserDto = {
    email: '',
    password: '',
  };
  usr_form: any;
  private readonly SESSION_KEY = 'sessionActive';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }

  ngOnInit() {
    this.usr_form = this.fb.group({
      email: [this.usr.email, [Validators.required, Validators.email]],
      password: [this.usr.password, [Validators.required]]
    });
  }

  navigate(nav: string) {
    this.router.navigate([nav]);
  }

  async onSubmit() {
    if (this.usr_form.invalid) {
      this.usr_form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = false;
    const data = {
      email: this.usr_form.get('email')?.value,
      password: this.usr_form.get('password')?.value
    };

    try {
      const response = await this.apiService.login('api/login_check', data);
      if (response.status === 200) {
        const { token, refresh_token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
        sessionStorage.setItem(this.SESSION_KEY, 'true');
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.loading = false;
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        this.error = true;
      } else {
        console.error('Erreur lors de la connexion :', error);
      }
    }
  }
}
