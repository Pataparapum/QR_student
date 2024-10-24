import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private storageKey = 'users'; 

  constructor() {
    
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  
  register(fullName: string, email: string, password: string): boolean {
    const users = this.getUsers(); 
    const existingUser = users.find(user => user.email === email);

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
