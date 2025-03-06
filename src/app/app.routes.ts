import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import {LoaderComponent} from './components/templates/loader/loader.component';
import {AccessDeniedComponent} from './components/templates/access-denied/access-denied.component';
import {ClientLoginComponent} from './components/auth/login/client-login/client-login.component';
import {ClientRegisterComponent} from './components/auth/register/client-register/client-register.component';

export const routes: Routes = [
  {
    path:"loader",component:LoaderComponent
  },
  {
    path:"access-denied",component:AccessDeniedComponent,
    data:{
      breadcrumb : [
        {
          label: 'Accès refusé',
          url: ''
        }
      ]
    }
  },
  {
    path:"connexion-client",component:ClientLoginComponent
  },
  {
    path:"inscription-client",component:ClientRegisterComponent
  }
];
