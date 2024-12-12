import { HttpUserService } from './../Services/http-user.service';
import { SALA } from './interface/salas';
import { Component, OnInit } from '@angular/core';
import { SalaService } from '../Services/sala.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { salaInterface } from '../Services/interface/sala.dto';
import { AlumnosControlService } from '../Services/alumnos-control.service';

@Component({
  selector: 'app-sala-clases',
  templateUrl: './sala-clases.page.html',
  styleUrls: ['./sala-clases.page.scss'],
})
export class SalaClasesPage implements OnInit {
  usuario = localStorage.getItem('loggedUser');
  salaArray: SALA[] = [];
  sala: SALA = { nombre: '', id: '', salas: [], fechaCreacion: '' };
  loggedUserAlumnoId: string | undefined;
  loggedUserName: string | null = null;
  userRole: string | null = null;

  constructor(
    private salaDB: SalaService,
    private router: Router,
    private alertController: AlertController,
    private alumnoService: AlumnosControlService,
    private userService:HttpUserService
  ) {}

  async ngOnInit() {
    this.getLoggedUserName();
    this.getUserRole();
    this.loadSalas();
  }

  async loadSalas() {
    const allSalas = await this.salaDB.get();

    if (this.userRole === 'Alumno') {
      this.salaArray = allSalas.filter((s) =>
        (s.salas || []).some((alumno:salaInterface) => alumno.alumnoid === this.loggedUserAlumnoId)
      );
    } else {
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
      salas: [],
      fechaCreacion: new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    this.salaDB.push(nuevaSala);
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

  async getLoggedUserName() {
    const storedUserName = JSON.parse(localStorage.getItem('users')!)
    this.loggedUserName = storedUserName.username;
    this.loggedUserAlumnoId = await this.alumnoService.alumnoExiste(storedUserName.id)
  }

  getUserRole() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    this.userRole = users.rol
    console.log('Rol del usuario:', this.userRole);
  }

  async logout() {
    await this.userService.logout();
    this.router.navigate(['/login']);
  }
}
