import { Component, OnInit } from '@angular/core';
import { SALA } from './interface/salaInterface';
import { SalaService } from '../Services/sala.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sala-clases',
  templateUrl: './sala-clases.page.html',
  styleUrls: ['./sala-clases.page.scss'],
})
export class SalaClasesPage implements OnInit {
  usuario = localStorage.getItem('loggedUser');
  salaArray: SALA[] = [];
  sala: SALA = { nombre: '', id: '', alumnos: [] };
  loggedUserName: string | null = null;
  userRole: string | null = null;

  constructor(
    private salaDB: SalaService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.getLoggedUserName();
    this.getUserRole();
    this.loadSalas();
  }

  async loadSalas() {
    const allSalas = await this.salaDB.get();
  
    if (this.userRole === 'Alumno') {
      // Filtrar salas donde el usuario logueado esté registrado como alumno
      this.salaArray = allSalas.filter((s) =>
        (s.alumnos || []).some((alumno) => alumno.nombre === this.loggedUserName)
      );
    } else {
      // Si es profesor, mostrar todas las salas
      this.salaArray = allSalas;
    }
  }
  

  async crearSala() {
    if (this.userRole !== 'Profesor') {
      console.error('Solo los profesores pueden crear salas.');
      return;
    }

    if (!this.sala.nombre.trim()) {
      console.error('El nombre de la sala es obligatorio');
      return;
    }

    if (this.salaArray.some((s) => s.nombre === this.sala.nombre.trim())) {
      console.error('El nombre de la sala ya existe');
      return;
    }

    const nuevaSala: SALA = {
      nombre: this.sala.nombre.trim(),
      id: (Math.random() * 100000).toFixed(0),
      alumnos: [], // Inicializado correctamente
    };

    await this.salaDB.push(nuevaSala);
    this.salaArray = await this.salaDB.get();
    this.sala.nombre = '';
  }

  async confirmarEliminarSala(salaID: string) {
    if (this.userRole !== 'Profesor') {
      console.error('Solo los profesores pueden eliminar salas.');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta sala? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarSala(salaID);
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarSala(salaID: string) {
    console.log(`Eliminando sala con ID: ${salaID}`);
    await this.salaDB.delete(salaID);
    this.salaArray = await this.salaDB.get();
  }

  getLoggedUserName() {
    const storedUserName = localStorage.getItem('loggedUser');
    this.loggedUserName = storedUserName;
  }

  getUserRole() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const loggedUser = this.loggedUserName;
    const user = users.find((u: { fullName: string }) => u.fullName === loggedUser);

    this.userRole = user ? user.role : null;
    console.log('Rol del usuario:', this.userRole);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }
}
