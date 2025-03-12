import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'app-mecanicien-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './mecanicien-register.component.html',
  styleUrls: ['./mecanicien-register.component.css']
})
export class MecanicienRegisterComponent implements OnInit {
  loading: boolean = false;
  error: boolean = false;
  usr_form: any;
  user: any = {};
  token : string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  )
  {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.checkToken();
    });
    this.usr_form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  checkToken() {
    if (!this.token||this.token=='') {
      this.router.navigate(['/access-denied']);
    }
    return this.apiService.getWithData('api/checkPasswordLink',{token:this.token})
      .then(
        (response) => {
          this.user = response.user;
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/inscription-introuvable']);
          return null;
        }
      );
  }
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  navigate(nav: string) {
    this.router.navigate([nav]);
  }

  onSubmit() {
    if (this.usr_form.invalid) {
      this.error = true;
      return;
    }

    this.loading = true;
    const data = {
      userId: this.user._id,
      password: this.usr_form.value.password
    }
    this.apiService.login('api/updatePassword', data).then(
      (response) => {
        if (response.status >= 200 && response.status <= 202) {
          this.router.navigate(['/connexion-mecanicien']);
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
