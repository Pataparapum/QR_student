import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private storageKey = 'users'; // Clave para el almacenamiento local

  constructor() {
    // Inicializa el almacenamiento local si no hay usuarios
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  // Método para registrar un nuevo usuario
  register(fullName: string, email: string, password: string): boolean {
    const users = this.getUsers(); // Obtener usuarios actuales
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return false; // Usuario ya registrado
    }

    // Agregar nuevo usuario
    users.push({ fullName, email, password });
    localStorage.setItem(this.storageKey, JSON.stringify(users)); // Guardar en localStorage
    return true; // Registro exitoso
  }

  // Método para obtener todos los usuarios
  getUsers(): { fullName: string; email: string; password: string }[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]'); // Retorna la lista de usuarios
  }

  // Método para imprimir usuarios en la consola
  logUsersToConsole(): void {
    console.log('Usuarios Registrados:', this.getUsers());
  }
}
