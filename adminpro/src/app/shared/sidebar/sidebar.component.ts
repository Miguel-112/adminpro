import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuairo } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public usuario!: Usuairo;
  public imgUrl='';
  menuItems: any[]=[];

  ngOnInit(): void {
    
    this.menuItems=this.sidebarService.menu;
  }

  constructor(public sidebarService:SidebarService,
    private usuarioService: UsuarioService)
{


  

  this.usuario= usuarioService.usuario;
}
}
