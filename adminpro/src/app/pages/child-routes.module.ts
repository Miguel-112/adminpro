import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const chilRoutes: Routes =[

  { path: '', component: DashboardComponent,data: {titulo:'Dashboard'}},
            { path: 'buscar/:termino', component: BusquedaComponent,data: {titulo:'Busquedas'} },
            { path: 'account-settings', component: AccountSettingsComponent,data: {titulo:'Ajustes de cuentas'} },
            { path: 'progress', component: ProgressComponent,data: {titulo:'ProgressBar'} },
            { path: 'grafica1', component: Grafica1Component,data: {titulo:'Grafica1'} },
            { path: 'promesas', component: PromesasComponent,data: {titulo:'Promesas'} },
            { path: 'rxjs', component: RxjsComponent,data: {titulo:'Rxjs'} },
            { path: 'perfil', component: PerfilComponent,data: {titulo:'Perfilde usuario'} },

        //    Mantenimientos

       
            { path: '', component: RxjsComponent,data: {titulo:'Rxjs'} },
            { path: 'perfil', component: PerfilComponent,data: {titulo:'Perfilde usuario'} },

            { path: 'hospitales', component: HospitalesComponent,data: {titulo:'Hospitales de la aplicación'} },
            { path: 'medicos', component: MedicosComponent,data: {titulo:'Medicos de la aplicación'} },
            { path: 'medico/:id', component: MedicoComponent,data: {titulo:'Medicos de la aplicación'} },
            { path: 'usuarios',canActivate:[AdminGuard] ,component: UsuariosComponent,data: {titulo:'Usuarios de la aplicación'} },
  
]


@NgModule({
  imports: [RouterModule.forChild(chilRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
