import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() { 
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }


  
  changeTheme(theme: string) {


    const url = `./assets/css/colors/${theme}.css`
    console.log(url);
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
   this.checkCurrenTheme();
  }


  checkCurrenTheme() {

    const links = document.querySelectorAll('.selector');

    const workingLinks = Array.from(document.querySelectorAll('.working'));
    
    workingLinks.forEach(link => {
      link.classList.remove('working');
    });

    Array.from(links).forEach(element => {
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeurl = `./assets/css/colors/${btnTheme}.css`;
      const currenTheme = this.linkTheme!.getAttribute('href');

      if (btnThemeurl === currenTheme) {
        element.classList.add('working');
      }
    });
  }
}
