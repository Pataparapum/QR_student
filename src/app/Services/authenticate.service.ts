import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor() {}

 
  ingresar(fullName: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { fullName: string; password: string }) => 
      u.fullName === fullName && u.password === password
    );
  
    return !!user;
  }
  

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}

