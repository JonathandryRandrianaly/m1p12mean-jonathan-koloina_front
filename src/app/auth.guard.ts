import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from './services/auth/auth-service.service';

export const authGuard: CanActivateFn = async (route, state) => {
  var status = false;
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');
  if (token) {
      const decoded = await authService.decodeToken();
      const requiredRoles = route.data?.['roles'] as Array<string>;

      if (decoded && decoded.roles) {
        if(requiredRoles){
          const hasAllRoles = requiredRoles.some(role => decoded.roles.includes(role));
          if (hasAllRoles) {
            status = true;
          } else {
            router.navigate(['access-denied']);
          }
        }else{
          status = true;
        }
      }else{
        router.navigate(['connexion-client']);
      }
  }else{
    router.navigate(['connexion-client']);
  }
  return status;
};
