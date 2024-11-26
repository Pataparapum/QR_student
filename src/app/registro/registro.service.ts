import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpUserService } from '../Services/http-user.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private storageKey = 'users'; 

  constructor(private api:HttpUserService) {
    
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  
  register(fullName: string, email: string, password: string, role: string): boolean {
    const users = this.getUsers();
    const existingUser = users.find(user => user.fullName === fullName);
  
    if (existingUser) {
      return false; 
    }
  
    users.push({ fullName, email, password, role }); // Se agrega el rol
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true; 
  }
  
  

  
  getUsers(): { fullName: string; email: string; password: string; role: string }[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  
  logUsersToConsole(): void {
    console.log('Usuarios Registrados:', this.getUsers());
  }
}
