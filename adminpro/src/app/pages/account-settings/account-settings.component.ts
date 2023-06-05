import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent {

  
  

  constructor(private settingsservice: SettingsService){}
  ngOnInit(): void {
  

   this.settingsservice.checkCurrenTheme();

  }


  changeTheme(theme: string) {


   this.settingsservice.changeTheme(theme);

   
    
  }

  


}
