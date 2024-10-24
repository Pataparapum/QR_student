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

  
  register(fullName: string, email: string, password: string): boolean {
  
    const users = this.getUsers();
    const existingUser = users.find(user => user.fullName === fullName);
    this.api.registerUser(fullName, email, password);
  
    if (existingUser) {
      return false; 
    }
  

    users.push({ fullName, email, password });
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true; 
  }
  

  
  getUsers(): { fullName: string; email: string; password: string }[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]'); 
  }

  
  logUsersToConsole(): void {
    console.log('Usuarios Registrados:', this.getUsers());
  }
}
