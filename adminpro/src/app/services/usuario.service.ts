import { Injectable,NgZone } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { tap, map, catchError } from 'rxjs/operators';

import { registerForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const google: any;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  public auth2: any;
  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
    this.logout = this.logout.bind(this);
  }



  googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '616115338227-aio6khd2tv3qt6mq1mlskpav1868145r.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }



  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    // this.auth2.signOut().then(() => {

    //   this.ngZone.run(() => {
        
    //   })
    // });

  }


  

 




  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );

  }

  CrearUsuario(formData: registerForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          localStorage.setItem('token', resp.token);
        })
      )
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          localStorage.setItem('token', resp.token);
        })
      )
  }


  loginGoogle(token: string) {

    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );

  }



}


