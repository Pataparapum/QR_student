import { userInterface } from './interface/userDto';
import { Injectable } from '@angular/core';
import { HttpUserService } from './http-user.service';
import { logInterface } from './interface/logDto';


@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private api:HttpUserService) {}

 
  ingresar(fullName: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user:userInterface = users.find((u: { fullName: string; password: string }) => 
      u.fullName === fullName && u.password === password
    );

    if (!!user) {
      const login:logInterface = {
        email:user.email,
        password:user.password
      }

      
      this.api.login(login);
    }

  
    return !!user;
  }
  

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}

