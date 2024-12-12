import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUserService } from '../Services/http-user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: { fullName: string; email: string; role: string } | null = null;

  constructor(private router: Router, private userService:HttpUserService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // Recupera los usuarios registrados
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Encuentra el usuario logueado en el localStorage
    this.userData = users

    if (!this.userData) {
      console.error('Usuario no encontrado');
    }
  }

  async logout() {
    await this.userService.logout()
    this.router.navigate(['/login']);
  }
}
