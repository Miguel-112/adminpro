import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagenSubir: File | null = null;
  public imgTemp: any = null;


constructor(public modalImagenService:ModalImagenService,
           public fileUploadServices:FileUploadService){}

  cerrarModal(){

    this.imgTemp=null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;


    if (this.imagenSubir) {
      this.fileUploadServices
        .actualizarFoto(this.imagenSubir,tipo, id)
        .then(img => {
          
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        }).catch(err => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        });
    } else {
      Swal.fire('Error', 'No se ha seleccionado ninguna imagen', 'error');
    }
  }


}
