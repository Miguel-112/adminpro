import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers(){

    return  {

      headers: {
        'x-token': this.token
      }

    }
}


cargarHospitales(){

  const url = `${base_url}/hospitales`;
  return this.http.get<{ ok: boolean; hospitales: Hospital[]; }>(url,this.headers)
  .pipe(
    map( (resp: { ok: boolean, hospitales: Hospital[] }): Hospital[] => resp.hospitales)
  );


}




CrearHospital(nombre:string){

  const url = `${base_url}/hospitales`;
  return this.http.post<{ ok: boolean; hospitales: Hospital[]; }>(url,{nombre},this.headers)
  // .pipe(
  //   map( (resp: { ok: boolean, hospitales: Hospital[] }): Hospital[] => resp.hospitales)
  // );


}



actualizarHospital( _id:any,nombre:string){

  const url = `${base_url}/hospitales/${_id}`;
  return this.http.put<{ ok: boolean; hospitales: Hospital[]; }>(url,{nombre},this.headers)
  // .pipe(
  //   map( (resp: { ok: boolean, hospitales: Hospital[] }): Hospital[] => resp.hospitales)
  // );


}


eliminarHospital( _id:any){

  const url = `${base_url}/hospitales/${_id}`;
  return this.http.delete<{ ok: boolean; hospitales: Hospital[]; }>(url,this.headers)
  // .pipe(
  //   map( (resp: { ok: boolean, hospitales: Hospital[] }): Hospital[] => resp.hospitales)
  // );


}


}
