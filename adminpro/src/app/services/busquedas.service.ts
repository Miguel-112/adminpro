import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuairo } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medicos.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) {


  }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  private transformarUsuarios(resultados: any[]): Usuairo[] {

    return resultados.map(
      user => new Usuairo(
        user.nombre, user.email, '', user.img, user.google, user.roles, user.uid
      ));
  }

  private transformarHospitales(resultados: any[]): Hospital[] {

    return resultados;
  }


  private transformarMedicos(resultados: any[]): Medico[] {

    return resultados;
  }





  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);
              break;
            case 'hospitales':
              return this.transformarHospitales(resp.resultados);
              break;

            case 'medicos':
              return this.transformarMedicos(resp.resultados);
              break;


            default:
              return [];
              break;
          }

        })
      )
  }



}
