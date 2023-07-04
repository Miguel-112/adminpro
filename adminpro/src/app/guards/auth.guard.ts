import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import {tap,map} from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Your authentication logic here
    // Return true if the user is authenticated, or false if not

    // Example:

    return this.usuarioService.validarToken()
    .pipe(
      tap( estaAutenticado =>  {
        if ( !estaAutenticado ) {
          this.router.navigateByUrl('/login');
        }
      })
    );

    
  }
}
