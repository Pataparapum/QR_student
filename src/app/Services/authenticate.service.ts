import { userInterface } from './interface/userDto';
import { Injectable } from '@angular/core';
import { HttpUserService } from './http-user.service';
import { logInterface } from './interface/logDto';


@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {

  private storageKey = 'users'; 
  
  constructor(private api:HttpUserService) {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  async ingresar(correo: string, password: string): Promise<boolean> {
      const login:logInterface = {
        email:correo,
        password: password
      }
      
      let user = await this.api.login(login);

      if (user) {
        const userData = await this.api.getUserForCorreo(correo);
        localStorage.setItem(this.storageKey, JSON.stringify(userData));
        return user
      }

      return false
    }
  

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}

