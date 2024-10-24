import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor() {}

  // Método para autenticar al usuario
  ingresar(userName: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { userName: string; password: string }) => 
      u.userName === userName && u.password === password
    );

    return !!user; // Devuelve true si el usuario existe, false en caso contrario
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}

