import { Component } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent {

 

  ngOnInit(): void {

  this.getUsuarios().then(usuarios =>{

    console.log(usuarios);

  })
    // const promesas = new Promise((resolve, reject) =>{

    //   if(false){
        
    //     resolve('hola bro');
    //   }else{

    //     reject('eror en la promesas');
    //   }
  
    // });
    // promesas.then((mensaje) =>{

    //   console.log(mensaje);

    // }).catch(error => console.log('Error promesa', error));
  
    // console.log('fin init');
    
  }

  getUsuarios() {

    return  new Promise(resolve =>{
      fetch('https://reqres.in/api/users')
  
      .then(resp =>resp.json())
      .then(body => console.log(body.data));

    })

    
    
    } 



  }


