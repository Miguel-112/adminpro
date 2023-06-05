import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function  customFunctions() : any;
  

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {

  
  constructor(private settingservice: SettingsService){}
  ngOnInit(): void {
  
    customFunctions();
    

  }

}
