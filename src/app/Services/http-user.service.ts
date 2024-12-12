import { userInterface } from './interface/userDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logInterface } from './interface/logDto';
import { first, firstValueFrom } from 'rxjs';
import { AlumnosControlService } from './alumnos-control.service';


@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  constructor(private api:HttpClient) { }

  url = "https://qrstudent-api.vercel.app/usuarios";

  async registerUser(user:userInterface): Promise<boolean> {
    let add = this.api.post(`${this.url}`, user)

    let userExistInDatabase = 
      firstValueFrom(add)
        .then(data => {
          return true;
        })
        .catch(err => {
          return false; 
        })
        
    
    return userExistInDatabase;
  }

  async login(login:logInterface) {
     let getLogin = this.api.post(`${this.url}/login`, login)

     let isLogin = 
      firstValueFrom(getLogin)
        .then((data:any) => {
          if (data.token) {
            localStorage.setItem('payload', data.payload);
            
            localStorage.setItem('isLoggedIn', 'true');
          }
          localStorage.setItem('isLoggedIn', 'false');
        })
      .catch(err => {
        localStorage.setItem('isLoggedIn', 'false');
      })
     
  }

  async logout() {
    let logout = this.api.post(`${this.url}/logout`, {})

    let closeSesion = firstValueFrom(logout).then(data => {
      localStorage.removeItem('isLoggedIn')
    })

  }

  async getUserForCorreo(correo:string) {
    let datos = this.api.get<userInterface>(`${this.url}/usuarios/${correo}`)

    let data = 
      await firstValueFrom(datos)
        .then(data => {
          return data;
        })
        .catch(err => {
          console.log(err);
          return undefined
        })

    return data;
  }
  
}
