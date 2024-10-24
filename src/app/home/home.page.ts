import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  usuario = localStorage.getItem('loggedUser');

  constructor(private router:Router) {}

  loggedUserName: string | null = null;

  navigateToAbout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getLoggedUserName();
    
  }

  getLoggedUserName() {
    // Recupera el nombre del usuario desde localStorage
    const storedUserName = localStorage.getItem('loggedUser');
    console.log('Nombre de usuario recuperado: ', storedUserName);  // Agregamos este log para depurar
    this.loggedUserName = storedUserName;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    console.log('La sesión se ha cerrado correctamente');
  }
  

}
