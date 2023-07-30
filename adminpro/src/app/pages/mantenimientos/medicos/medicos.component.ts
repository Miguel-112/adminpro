import { Component, OnDestroy } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Medico } from 'src/app/models/medicos.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnDestroy {

  public cargando : boolean = true;
  public medicos:Medico[]=[];
  public medicosTemp:Medico[]=[];
  private imgSubs!: Subscription;

 
  constructor(private medicosService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasServices: BusquedasService){

  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarMedicos();

    
    this.imgSubs =  this.modalImagenService.nuevaImagen.
    pipe(

      delay(300)

    ).subscribe(img =>{
      console.log(img);
      this.cargarMedicos()

    });
    
  }

  cargarMedicos(){
    this.cargando = true;

    this.medicosService.cargarMedicos()
      .subscribe(medicos=>{
        this.cargando=false;  
        this.medicos = medicos;
        this.medicosTemp=medicos
        console.log(medicos);
      })
  }


  abrirModal(medico:Medico){
    console.log(medico);
    this.modalImagenService.abrirModal('medicos',medico._id, medico.img);
    
  }


  
  buscar(termino: string) {

    if (termino.length === 0) {
      this.medicos = this.medicosTemp;
    }

    this.busquedasServices.buscar('medicos',termino)
      .subscribe(resp => {
        this.medicos = resp;
      });
  }


  eliminarMedico(medico:Medico){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Borrar Medico?',
      text: `Esta apunto de borra a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.medicosService.eliminarMedico(medico._id)
          .subscribe(resp => {
            this.cargarMedicos();
            Swal.fire('Medico borrado',
              `${medico.nombre} fue eliminado correctamente`,
              'success'
            )
          });

      }
    })
    return null;

  }




 


}
