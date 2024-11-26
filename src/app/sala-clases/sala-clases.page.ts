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
  sala: SALA = {
    nombre: '',
    id: '',
    alumnos: []
  };

  constructor(
    private salaDB: SalaService,
    private router: Router,
    private alertController: AlertController
  ) {}

  loggedUserName: string | null = null;

  async ngOnInit() {
    // Cargar las salas existentes
    this.salaArray = await this.salaDB.get();
    this.getLoggedUserName();
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

  async confirmarEliminarSala(salaID: string) {
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
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarSala(salaID);
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarSala(salaID: string) {
    console.log(`Eliminando sala con ID: ${salaID}`);
    await this.salaDB.delete(salaID);
    this.salaArray = await this.salaDB.get();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    console.log('Sesión cerrada');
  }

  getLoggedUserName() {
    // Recupera el nombre del usuario desde localStorage
    const storedUserName = localStorage.getItem('loggedUser');
    console.log('Nombre de usuario recuperado: ', storedUserName);  // Agregamos este log para depurar
    this.loggedUserName = storedUserName;
  }
}
