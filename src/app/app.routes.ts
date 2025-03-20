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
import {
  DemandeServiceClientComponent
} from './components/client/demande-service-client/demande-service-client.component';
import { TypeEntretienParametreComponent } from './components/parametre/type-entretien-parametre/type-entretien-parametre.component';
import { VehiculeParametreComponent } from './components/parametre/vehicule-parametre/vehicule-parametre.component';
import {CalendrierTacheComponent} from './components/parametre/calendrier-tache/calendrier-tache.component';
import {CalendrierDetailComponent} from './components/parametre/calendrier-detail/calendrier-detail.component';
import {StockParametreComponent} from './components/parametre/stock-parametre/stock-parametre.component';
import {RendezVousComponent} from './components/client/rendez-vous/rendez-vous.component';
import {DetailTacheComponent} from './components/parametre/detail-tache/detail-tache.component';
import {FactureListeComponent} from './components/parametre/facture-liste/facture-liste.component';
import {FactureDetailComponent} from './components/parametre/facture-detail/facture-detail.component';

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
      roles: [
        'mecanicien'
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
      roles: [
        'mecanicien'
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
    path:"demande-service",component:DemandeServiceClientComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Demande Service', url: '' }
      ],
      roles: [
        'client'
      ]
    }
  },
  {
    path:"rendez-vous",component:RendezVousComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Demande', url: '/demande-service' },
        { label: 'Rendez-vous', url: '' }
      ],
      roles: [
        'client'
      ]
    }
  },
  {
    path:"parametre/types-entretien",component:TypeEntretienParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Entretien', url: '' },
        { label: 'Types', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"vehicules",component:VehiculeParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Vehicules', url: '' }
      ],
      roles: [
        'manager',
        'client'
      ]
    }
  },
  {
    path:"stocks/:id",component:StockParametreComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Consommables', url: '' },
        { label: 'Stocks', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"calendrier-tache",component:CalendrierTacheComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Calendrier', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"calendrier-detail",component:CalendrierDetailComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Calendrier', url: 'calendrier-tache' },
        { label: 'Détails', url: '' }
      ],
      roles: [
        'manager'
      ]
    }
  },
  {
    path:"tache/:id",component:DetailTacheComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Tâches', url: '' },
        { label: 'Détails', url: '' }
      ],
      roles: [
        'client',
        'mecanicien',
        'manager'
      ]
    }
  },
  {
    path:"factures",component:FactureListeComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Factures', url: '' }
      ],
      roles: [
        'client',
        'manager'
      ]
    }
  },
  {
    path:"factures/:id",component:FactureDetailComponent,
    canActivate:[authGuard],
    data:{
      breadcrumb : [
        { label: 'Accueil', url: '/' },
        { label: 'Factures', url: '/factures' },
        { label: 'Détails', url: '' }
      ],
      roles: [
        'client',
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
