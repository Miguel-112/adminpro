import { Component, OnDestroy } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnDestroy{


  public hospitales :Hospital[]=[];
  public cargando:boolean=true;
  private imgSubs!: Subscription;
  public hospitalesTemp: Hospital[] = [];

  constructor(private hospitalService: HospitalService,
    private modalImagenService:ModalImagenService,
    private busquedasServices: BusquedasService){


  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  ngOnInit(): void {
   
    this.cargarHospitales();

    this.imgSubs =  this.modalImagenService.nuevaImagen.
    pipe(

      delay(300)

    ).subscribe(img =>{
      console.log(img);
      this.cargarHospitales()

    });
    
    
  }

  cargarHospitales(){

    this.cargando=true;
    this.hospitalService.cargarHospitales()
    .subscribe(hospitales =>{
      this.cargando=false;
      console.log(hospitales);
      this.hospitales=hospitales;
      this.hospitalesTemp=hospitales;
    })
  }



  guardarCambios(hospital: Hospital){

    this.hospitalService.actualizarHospital(hospital._id,hospital.nombre)
    .subscribe(resp =>{

      Swal.fire('Actualizado',hospital.nombre,'success');

    });

  }


  eliminarHospital(hospital: Hospital){


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Borrar Hospital?',
      text: `Esta apunto de borra a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.hospitalService.eliminarHospital(hospital._id)
          .subscribe(resp => {
            this.cargarHospitales();
            Swal.fire('Hospital borrado',
              `${hospital.nombre} fue eliminado correctamente`,
              'success'
            )
          });

      }
    })
    return null;

  }

  


 async abrirSweetAlert(){

    const {value} = await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if(value!==undefined){

    if(value?.trim().length >0){

      this.hospitalService.CrearHospital(value)
      .subscribe((resp:any)=>{
       this.hospitales.push(resp.hospital)
      })


    }

    }


  
    
   
  }

  abrirModal(hospital:Hospital){

    console.log(hospital);
    this.modalImagenService.abrirModal('hospitales',hospital._id, hospital.img);
  }


  buscar(termino: string) {

    

    if (termino.length === 0) {
      this.hospitales = this.hospitalesTemp;
    }

    this.busquedasServices.buscar('hospitales',termino)
      .subscribe(resp => {
        this.hospitales = resp;
      });
  }







  

}
