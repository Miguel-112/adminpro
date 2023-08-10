import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeadcrumbsComponent } from './beadcrumbs/beadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    BeadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
  ],
 
  exports: [
    BeadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
  ],


  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
