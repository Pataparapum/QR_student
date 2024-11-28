import { userInterface } from './interface/userDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logInterface } from './interface/logDto';


@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  constructor(private api:HttpClient) { }

  url = "https://qrstudent-api.vercel.app/usuarios";

  async registerUser(user:userInterface) {
    this.api.post(`${this.url}`, user).subscribe((data:any) => {
      
    });
  }

  async login(login:logInterface) {
     this.api.post(`${this.url}/login`, login).subscribe((data:any) => {
        if (data.token) {
          localStorage.setItem('payload', data.payload);
          
          localStorage.setItem('isLoggedIn', 'true');
        }
      
        localStorage.setItem('isLoggedIn', 'false');
      })
  }

  async logout() {
    await this.api.post(`${this.url}/logout`, {}).subscribe((data:any) => {
      if (data.status == 200) {
        localStorage.removeItem('isLoggedIn')
      };
    });

  }

  async getUserForCorreo(correo:string) {
    return this.api.get<userInterface>(`${this.url}/usuarios/${correo}`).subscribe((data:userInterface) => {
      return data;
    })
  }

  
}
