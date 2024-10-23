import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor() {}

  // Método para autenticar al usuario
  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    return !!user; // Devuelve true si el usuario existe, false en caso contrario
  }
}
