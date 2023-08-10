import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function  customFunctions() : any;
  

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {

  
  constructor(private settingservice: SettingsService,
     private sidebarService: SidebarService){}
  ngOnInit(): void {
  
    customFunctions();
    this.sidebarService.cargarMenu();
    console.log(this.sidebarService.menu);
    

  }

}
