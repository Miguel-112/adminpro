import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medicos.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent {


  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: Hospital;

  ngOnInit(): void {

    
    this.ActivatedRoute.params.subscribe(({id}) => {
      this.cargarMedico(id); 
    })


   
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();



    if (this.medicoForm && this.medicoForm.get('hospital')) {
      this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
       

        let foundHospital = this.hospitales.find(h => h._id === hospitalId);

        if (foundHospital) {
          this.hospitalSeleccionado = foundHospital;
        } else {
          return;
        }



      });
    }





  }

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private MedicoService:MedicoService,
    private router: Router,
    private ActivatedRoute:ActivatedRoute) {

  }


  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        console.log(hospitales);
        this.hospitales = hospitales;
      })
  }

  cargarMedico(id: string) {

    if(id=='nuevo'){
      return;
    }

    this.MedicoService.obtenerMedicoPorId(id)
       .pipe(
        delay(100)
       )
      .subscribe(medico => {

        if(!medico){
          this.router.navigateByUrl(`/dashboard/medicos`)
        }
        
        const { nombre, hospital } = medico;
        let _id: any; // Declaración de la variable _id
  
        if (hospital) {
          _id = hospital._id; // Asignación del valor a _id 
        }
        this.medicoSeleccionado = medico;

        this.medicoForm.setValue({nombre,hospital:_id});
      });
  }
  
  

  guardarMedico() {
    const {nombre} = this.medicoForm.value;

    if(this.medicoSeleccionado){
      const data ={
        ...this.medicoForm.value,
        _id:this.medicoSeleccionado._id
      }

      this.MedicoService.actualizarMedico(data)
      .subscribe(resp =>{
       console.log(resp);
        swal.fire('Actualizado',`${nombre} Actualizado  Correctamente`,'success');


      })

    }else{

      
      console.log(this.medicoForm.value);
      this.MedicoService.CrearMedico(this.medicoForm.value)
      .subscribe((resp:any)=>{
        swal.fire('Creado',`${nombre} creado Correctamente`,'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      })
    }
    }
}
