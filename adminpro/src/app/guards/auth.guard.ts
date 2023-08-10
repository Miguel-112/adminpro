import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import {tap,map} from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate,CanLoad {
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken()
    .pipe(
      tap( estaAutenticado =>  {
        if ( !estaAutenticado ) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

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
