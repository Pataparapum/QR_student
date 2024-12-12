import { Data } from '@angular/router';
import { userInterface } from './interface/userDto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { logInterface } from './interface/logDto';
import { firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  constructor(private api:HttpClient) {}

  url = "https://qrstudent-api.vercel.app/usuarios";
  

  async registerUser(user:userInterface): Promise<boolean> {
    let add = this.api.post(`${this.url}`, user)

    let userExistInDatabase = 
      await firstValueFrom(add)
        .then(data => {
          console.log(data);
          
          return true;
        })
        .catch(err => {
          console.log(err);
          
          return false; 
        })
        
    
    return userExistInDatabase;
  }

  async login(login:logInterface) {
     let getLogin = this.api.post(`${this.url}/login`, login)

     let isLogin = 
      await firstValueFrom(getLogin)
        .then((data:any) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            
            localStorage.setItem('isLoggedIn', 'true');
            return true;
          } else {
            localStorage.setItem('isLoggedIn', 'false');
            return false
          }
        })
      .catch(err => {
        localStorage.setItem('isLoggedIn', 'false');
      })
     
      return isLogin
  }

  async logout() {
    const opciones = {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Authorization':`Bearer ${localStorage.getItem('token')!}`
      })
        
    }
    let logout = this.api.post(`${this.url}/logout`, {}, opciones)

    let closeSesion = await firstValueFrom(logout).then(data => {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('token')
      localStorage.removeItem('users')
      localStorage.removeItem('loggedUser')
    })

  }

  async getUserForCorreo(correo:string) {
    let datos = this.api.get<userInterface>(`${this.url}/${correo}`)

    let data = 
      await firstValueFrom(datos)
        .then((data:any) => {
          return data;
        })
        .catch(err => {
          console.log(err);
          return undefined
        })
    
    return data;
  }
  
}
