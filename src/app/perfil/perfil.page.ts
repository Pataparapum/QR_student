import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: { fullName: string; email: string; role: string } | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // Recupera los usuarios registrados
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const loggedUser = localStorage.getItem('loggedUser');

    // Encuentra el usuario logueado en el localStorage
    this.userData = users.find((user: { fullName: string }) => user.fullName === loggedUser) || null;

    if (!this.userData) {
      console.error('Usuario no encontrado');
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }
}
