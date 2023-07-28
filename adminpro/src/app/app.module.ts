import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { LoginComponent } from './auth/login/login.component';
 import { AuthModuleTsModule } from './auth/auth.module.ts.module';







@NgModule({
  declarations: [
   
    AppComponent,
    NopagefoundComponent,
   


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModuleTsModule,
    PagesModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
