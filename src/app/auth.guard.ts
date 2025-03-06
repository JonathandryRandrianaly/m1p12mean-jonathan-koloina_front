import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  var statu = false;
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const requiredRoles = route.data?.['roles'] as Array<string>;

      if (payload && payload.roles) {
        if(requiredRoles){
          const hasAllRoles = requiredRoles.some(role => payload.roles.includes(role));
          if (hasAllRoles) {
            statu = true;
          } else {
            router.navigate(['access-denied']);
          }
        }else{
          statu = true;
        }
      }
  }else{
    router.navigate(['connexion-client']);
  }
  return statu;
};
