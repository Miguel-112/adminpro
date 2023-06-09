import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitterd = false;


 

  public registerForm = this.fb.group({
   nombre:['',[Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]],
    terminos:[false,[Validators.required]]
  },{
    Validators:this.passwordsIguales('password','password2')
  });

  constructor(private fb:FormBuilder,
         private usuarioService: UsuarioService,
         private router: Router){
    
  }


  crearUsuario(){


    this.formSubmitterd = true;
    if(this.registerForm.invalid){
     return;
    }

    // Realizar el posteo

    this.usuarioService.CrearUsuario(this.registerForm.value)
    .subscribe(resp =>{
      console.log('usuario creado');
      this.router.navigateByUrl('/');
      console.log(resp);
    }, (err)=>{
      // mostrar error

      swal.fire('Error', err.error.msg,'error');

    }
      );
  }

  campoNoValido(campo:string):boolean{

    if(this.registerForm.get(campo)?.invalid &&  this.formSubmitterd){
     
      return true;
    }else{
      return false;
    }

  }


  contrasenaNoVaLIDAS(){

    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if((pass1 !== pass2) &&  this.formSubmitterd){

      return true;

    }else{

      return false;
    }


  }

  aceptaTerminos(){
   return !this.registerForm.get('terminos')?.value && this.formSubmitterd;
  }


  passwordsIguales(pass1Name:string,pass2Name:string){

    return (forGroup:FormGroup) => {

      const pass1Control = forGroup.get(pass1Name);
      const pass2Control = forGroup.get(pass2Name);


      if(pass1Control?.value === pass2Control?.value){

        pass2Control?.setErrors(null);

      }else{
        pass2Control?.setErrors({noEsIgual:true});
      }

    }




  }



}
