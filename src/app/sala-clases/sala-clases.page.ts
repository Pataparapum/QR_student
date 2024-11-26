import { Component, OnInit } from '@angular/core';
import { SALA } from './interface/salaInterface';
import { SalaService } from '../Services/sala.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sala-clases',
  templateUrl: './sala-clases.page.html',
  styleUrls: ['./sala-clases.page.scss'],
})
export class SalaClasesPage implements OnInit {
  salaArray: SALA[] = [];
  sala: SALA = {
    nombre: '',
    id: '',
    alumnos: []
  };

  constructor(private salaDB: SalaService, private router: Router) {}

  async ngOnInit() {
    // Cargar las salas existentes
    this.salaArray = await this.salaDB.get();
  }

  async crearSala() {
    if (!this.sala.nombre.trim()) {
      console.error('El nombre de la sala es obligatorio');
      return;
    }

    if (this.salaArray.some(s => s.nombre === this.sala.nombre.trim())) {
      console.error('El nombre de la sala ya existe');
      return;
    }

    const nuevaSala: SALA = {
      nombre: this.sala.nombre.trim(),
      id: (Math.random() * 100000).toFixed(0),
      alumnos: []
    };

    await this.salaDB.push(nuevaSala);
    this.salaArray = await this.salaDB.get();
    this.sala.nombre = '';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }
}
