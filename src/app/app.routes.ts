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
import {UserParametreComponent} from './components/parametre/user-parametre/user-parametre.component';
import {MarqueParametreComponent} from './components/parametre/marque-parametre/marque-parametre.component';
import { EnergieMoteurParametreComponent } from './components/parametre/energie-moteur-parametre/energie-moteur-parametre.component';

export const routes: Routes = [
  {
    path:"",component:AccueilComponent, canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '' }
      ],
      roles: [
        'manager',
        'mecanicien',
        'client'
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
        { label: 'Accueil', url: '/' },
        { label: 'Accès refusé', url: '' }
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
    path:"parametre/users",component:UserParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Paramètres', url: '' },
        { label: 'Utilisateurs', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/marques",component:MarqueParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Paramètres', url: '' },
        { label: 'Marques', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/energie-moteur",component:EnergieMoteurParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Paramètres', url: '' },
        { label: 'Energie Moteur', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
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
