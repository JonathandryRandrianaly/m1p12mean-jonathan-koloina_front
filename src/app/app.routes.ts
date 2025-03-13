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
import { TransmissionParametreComponent } from './components/parametre/transmission-parametre/transmission-parametre.component';
import { CategorieEntretienParametreComponent } from './components/parametre/categorie-entretien-parametre/categorie-entretien-parametre.component';
import { UniteParametreComponent } from './components/parametre/unite-parametre/unite-parametre.component';
import { MotriciteParametreComponent } from './components/parametre/motricite-parametre/motricite-parametre.component';
import { SpecialisationParametreComponent } from './components/parametre/specialisation-parametre/specialisation-parametre.component';
import {TacheMecanicienComponent} from './components/mecanicien/tache-mecanicien/tache-mecanicien.component';
import {
  HistoriqueMecanicienComponent
} from './components/mecanicien/historique-mecanicien/historique-mecanicien.component';
import { RoleParametreComponent } from './components/parametre/role-parametre/role-parametre.component';
import { ConsommableParametreComponent } from './components/parametre/consommable-parametre/consommable-parametre.component';
import { ModeleParametreComponent } from './components/parametre/modele-parametre/modele-parametre.component';
import { CategorieModeleParametreComponent } from './components/parametre/categorie-modele-parametre/categorie-modele-parametre.component';

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
    path:"parametre/transmissions",component:TransmissionParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Paramètres', url: '' },
        { label: 'Transmissions', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/categories-entretien",component:CategorieEntretienParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Entretien', url: '' },
        { label: 'Catégories entretien', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/unites",component:UniteParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Système', url: '' },
        { label: 'Unités', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/motricites",component:MotriciteParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Paramètre', url: '' },
        { label: 'Motricités', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/specialisations",component:SpecialisationParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Système', url: '' },
        { label: 'Spécialisations', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"mecanicien/tasks",component:TacheMecanicienComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Mécanicien', url: '' },
        { label: 'Tâches', url: '' }
      ],
      // TODO: mécanicien
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"mecanicien/historiques",component:HistoriqueMecanicienComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Mécanicien', url: '/mecanicien/tasks' },
        { label: 'Historiques', url: '' }
      ],
      // TODO: mécanicien
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/roles",component:RoleParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Système', url: '' },
        { label: 'Rôles', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/consommables",component:ConsommableParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Système', url: '' },
        { label: 'Consommables', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/modeles",component:ModeleParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Paramètre', url: '' },
        { label: 'Modèles', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"parametre/categories-modele",component:CategorieModeleParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Paramètre', url: '' },
        { label: 'Catégories de modèles', url: '' }
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
