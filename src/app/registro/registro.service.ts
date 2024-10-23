import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private storageKey = 'users'; 

  constructor() {
    // Inicializa el almacenamiento local 
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  // Método para registrar un nuevo usuario
  register(fullName: string, email: string, password: string): boolean {
    const users = this.getUsers(); 
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return false;
    }


    users.push({ fullName, email, password });
    localStorage.setItem(this.storageKey, JSON.stringify(users)); // Guardar en localStorage
    return true; 
  }


  getUsers(): { fullName: string; email: string; password: string }[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]'); // Retorna la lista de usuarios
  }

  logUsersToConsole(): void {
    console.log('Usuarios Registrados:', this.getUsers());
  }
}
