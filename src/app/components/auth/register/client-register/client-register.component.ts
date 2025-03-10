import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../../../services/api/api.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-client-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.css'
})
export class ClientRegisterComponent implements OnInit {
  loading: boolean = false;
  error: boolean = false;
  usr_form: any;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.usr_form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      genre: ['', Validators.required],
      nom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]]
    });
  }

  navigate(nav: string) {
    this.router.navigate([nav]);
  }

  onSubmit() {
    if (this.usr_form.invalid) {
      return;
    }

    this.loading = true;
    const user = this.usr_form.value;
    user.roleLibelles = ['client'];

    this.apiService.login('api/register', user).then(
      (response) => {
        if (response.status >= 200 && response.status <= 202) {
          this.router.navigate(['/connexion-client']);
        }
      },
      (error) => {
        this.loading = false;
        this.error = true;
        console.error('Erreur lors de l\'inscription :', error);
      }
    );
  }
}
