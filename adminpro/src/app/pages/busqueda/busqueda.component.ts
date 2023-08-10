import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medicos.model';
import { Usuairo } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  public usuarios:Usuairo[]=[];
  public hospitales:Hospital[]=[];
  public medicos:Medico[]=[];

  constructor(private activateRoute:ActivatedRoute,
              private busquedasService:BusquedasService){

  }

  ngOnInit(): void {
    
    this.activateRoute.params.
    subscribe(({termino})=>this.busquedaGlobal(termino));
    
  }


  busquedaGlobal(termino:string){

    this.busquedasService.busquedaGlobal(termino)
    .subscribe((resp:any)=>{
      this.usuarios=resp.usuarios;
      this.medicos=resp.medicos;
      this.hospitales=resp.hospitales;
    })

  }


  abrirMedico(medico:Medico){

    
  }
}
