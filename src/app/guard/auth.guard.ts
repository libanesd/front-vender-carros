import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let admin = false;

  if (authService.isTokenExpired()) {
    console.log('Token inválido');
    authService.removeToken();
    authService.removeUsuarioLogado();
    router.navigate(['/login']);
    return false;
  } else {
    console.log('Token válido');
    authService.getUsuarioLogado().forEach((usuario)=> {
      if(usuario?.tipodeusuario.label === "Admin"){
        admin = true;
      }else{
        admin = false;
      }
    });
    if(admin){
      return true;
    }else{
      router.navigate(['/login']);
      return false;
    }
  }
};