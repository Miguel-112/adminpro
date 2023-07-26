import { environment } from "src/environments/environment"

const base_Url=environment.base_url;
export class Usuairo{

    constructor(

        public  nombre:string,
        public  email:string,
        public  password?:string,
        public img?:string,
        public  google?:boolean,
        public  roles?:string,
        public uid?:string,
    ){ }


   get imagenUrl(){
    // /upload/hospitales/888ab48a-12e3-41bf-a10b-3d15a8efd46a.jpg

    if(this.img?.includes('https')){

        return this.img;

    }
    
    if(this.img){
        return `${base_Url}/upload/usuarios/${this.img}`;
    }else{
        return `${base_Url}/upload/usuarios/no-image`; 
    }
    
    return ''
   }
}