import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../registro/registro.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user = {
    fullName: '',
    email: ''
  };

  constructor(private registroService: RegistroService, private router: Router) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const users = this.registroService.getUsers();
    const loggedUser = localStorage.getItem('loggedUser');

    if (loggedUser) {
      const user = users.find(u => u.fullName === loggedUser);
      if (user) {
        this.user = user;
      } else {
        console.error('Usuario no encontrado');
      }
    } else {
      console.error('No hay usuario logueado');
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }
}
