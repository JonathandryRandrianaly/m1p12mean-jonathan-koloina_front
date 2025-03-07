import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import {LoaderComponent} from './components/templates/loader/loader.component';
import {AccessDeniedComponent} from './components/templates/access-denied/access-denied.component';
import {ClientLoginComponent} from './components/auth/login/client-login/client-login.component';
import {ClientRegisterComponent} from './components/auth/register/client-register/client-register.component';
import {MecanicienLoginComponent} from './components/auth/login/mecanicien-login/mecanicien-login.component';
import {ManagerLoginComponent} from './components/auth/login/manager-login/manager-login.component';
import {
  MecanicienRegisterComponent
} from './components/auth/register/mecanicien-register/mecanicien-register.component';
import {AccueilComponent} from './components/accueil/accueil.component';
import {PageNotFoundComponent} from './components/templates/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path:"",component:AccueilComponent, canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '' }
      ]
    }
  },
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
    path:"connexion-mecanicien",component:MecanicienLoginComponent
  },
  {
    path:"connexion-manager",component:ManagerLoginComponent
  },
  {
    path:"inscription-client",component:ClientRegisterComponent
  },
  {
    path:"inscription-mecanicien",component:MecanicienRegisterComponent
  },
  {
    path: '**', component: PageNotFoundComponent,
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Page introuvable', url: '' }
      ]
    }
  }
];
