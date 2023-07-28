import { Injectable, NgZone } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { tap, map, catchError, delay } from 'rxjs/operators';

import { registerForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuairo } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interfaces';

const base_url = environment.base_url;

declare const google: any;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuairo;
  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
    this.logout = this.logout.bind(this);
  }

 get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario.uid || '';
  }


  get headers(){

    return  {

      headers: {
        'x-token': this.token
      }

    }
}

  


  googleInit() {

    return new Promise<void>(resolve => {
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
  

 return new Observable<boolean>((observer) => {
    this.ngZone.run(() => {
      this.http.get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        }
      }).subscribe(
        (resp: any) => {
          const { email, google, nombre, roles, img ='' , uid } = resp.usuario;
          this.usuario = new Usuairo(nombre, email, '', img, google, roles, uid);
          console.log(this.usuario);
          
        //  this.usuario.imprimirUsuario()
          
          localStorage.setItem('token', resp.token);
          
          observer.next(true);
          observer.complete();
        },
        (error) => {
          observer.next(false);
          observer.complete();
        }
      );
    });
  });
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

  actualizarPerfil( data: { email: string, nombre: string, roles:string } ) {

    data = {
       ...data,
      roles: this.usuario.roles || ''
     };

    return this.http.put(`${ base_url }/usuarios/${this.uid}`, data,this.headers);

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


  cargarUsuario(desde:number=0){

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url,this.headers
      ).pipe(
      
        map(response =>{

          const usuarios = response.usuarios.map( user => new Usuairo(
            user.nombre,user.email,'',user.img,user.google,user.roles,user.uid
          ));

          console.log(response);
          return {
            total:response.total,
            usuarios
          }
        })
      )

  }


  eliminarUsuario(usuario:Usuairo){


    // usuarios/648352ee6e070b16875c9f8b
   
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete<CargarUsuario>(url,this.headers
      )




  }


  guardarUsuario( usuario:Usuairo  ) {

    return this.http.put(`${ base_url }/usuarios/${usuario.uid}`, usuario,this.headers);

  }



}


