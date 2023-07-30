import { Component, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuairo } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription, delay, pipe } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuairo[] = [];
  public usuariosTemp: Usuairo[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs!:Subscription;

  constructor(private usuarioService: UsuarioService,
    private busquedasServices: BusquedasService,
    private modalImagenService:ModalImagenService) {

  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  ngOnInit(): void {

    this.cargarUsuarios();

    this.imgSubs =  this.modalImagenService.nuevaImagen.
    pipe(

      delay(300)

    ).subscribe(img =>{
      console.log(img);
      this.cargarUsuarios()

    });
    

  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuario(this.desde)
      .subscribe(({ total, usuarios }) => {

        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;


      })

  }

  cambiarPagina(valor: number) {

    this.desde += valor;

    if (this.desde < 0) {

      this.desde = 0;

    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }



  buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
    }
  
    this.busquedasServices.buscar('usuarios', termino)
      .subscribe((resp: Usuairo[] | Hospital[]) => {
        if (Array.isArray(resp) && resp.length > 0 && resp[0] instanceof Usuairo) {
          this.usuarios = resp as Usuairo[];
        } else {
          return;
        }
      });
  }
  

  eliminarUsuario(usuario: Usuairo) {

    console.log(this.usuarioService.uid);

    if(usuario.uid === this.usuarioService.uid){

      return Swal.fire('Error', 'No puede borrarse a si mismo','error');
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Borrar usuario?',
      text: `Esta apunto de borra a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            this.cargarUsuarios();
            Swal.fire('Usuario borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            )
          });

      }
    })
    return null;
  }



  cambiarRole(usuario:Usuairo){

this.usuarioService.guardarUsuario(usuario)
  .subscribe(resp =>{
     
  } )

  }


  abrirModal(usuario:Usuairo){

    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);

  }

  

}
