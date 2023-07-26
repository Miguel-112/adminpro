import { Component,NgZone,AfterViewInit, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2'; 

declare  const google:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {

 @ViewChild('googleBtn') googleBtn: ElementRef | undefined;

  public formSubmitterd = false;


 

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });
  

constructor(private router: Router,
  private fb:FormBuilder,
  private usuarioService: UsuarioService,
  private ngZone: NgZone) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }


  googleInit(){
    google.accounts.id.initialize({
      client_id:
        "616115338227-aio6khd2tv3qt6mq1mlskpav1868145r.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" } // customization attributes
    );
  }

  handleCredentialResponse(reponse:any){

       console.log("Encoded JWT ID token: " + reponse.credential);
       this.usuarioService.loginGoogle(reponse.credential)
       .subscribe(resp =>{
        this.router.navigateByUrl('/');
       })
  }
  login(){

    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp =>{

      if(this.loginForm.get('remember')?.value){

        localStorage.setItem('email',this.loginForm.get('email')?.value);
        

      }else{

        localStorage.removeItem('email');

      }
      this.ngZone.run(()=>{

        this.router.navigateByUrl('/');
      });
      // console.log('usuario creado');
      console.log(resp);
    }, (err)=>{
      // mostrar error

      swal.fire('Error', err.error.msg,'error');

    }
      );

  }

}
