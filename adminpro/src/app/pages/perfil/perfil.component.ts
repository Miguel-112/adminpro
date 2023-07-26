import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuairo } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent {

  public perfilForm!: FormGroup;
  public usuario!: Usuairo;
  public imagenSubir: File | null = null;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadServices:FileUploadService
              ) {
    
     this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ],
      email: [this.usuario.email, [ Validators.required, Validators.email ] ],
    });

  }

  actualizarPerfil() {
    console.log( this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(resp=>{
      const {nombre, email}= this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email=email;

      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
     });
   
    
  }


  cambiarImagen(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    console.log(file);

  
    if (file) {
      this.imagenSubir = file;
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    } else {
      this.imagenSubir = null;
      this.imgTemp = null;
    }
  }





  subirImagen() {
    if (this.imagenSubir) {
      this.fileUploadServices
        .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
        .then(img => {
          this.usuario.img = img;
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        }).catch(err => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        });
    } else {
      Swal.fire('Error', 'No se ha seleccionado ninguna imagen', 'error');
    }
  }
  




}
