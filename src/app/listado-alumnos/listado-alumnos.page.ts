import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from '../Services/sala.service';
import { ALUMNO } from '../sala-clases/interface/alumnoInterface';
import { AlertController } from '@ionic/angular';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.page.html',
  styleUrls: ['./listado-alumnos.page.scss'],
})
export class ListadoAlumnosPage implements OnInit {
  alumnos: ALUMNO[] = [];
  salaID: string = '';
  salaNombre: string = '';
  nombreAlumno: string = '';
  qrCodeUrl: string = '';
  loggedUserName: string | null = null;
  userRole: string | null = null; // Para controlar el rol del usuario

  constructor(
    private route: ActivatedRoute,
    private salaService: SalaService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.salaID = this.route.snapshot.paramMap.get('id') || '';
    this.cargarSala();
    this.getLoggedUserName();
    this.getUserRole(); // Obtener el rol del usuario
  }

  cargarSala() {
    const sala = this.salaService.getSalaWithId(this.salaID);

    if (sala) {
      this.salaNombre = sala.nombre;
      this.alumnos = sala.alumnos || [];
    } else {
      console.error('No se encontró la sala con el ID proporcionado.');
    }
  }

  getLoggedUserName() {
    this.loggedUserName = localStorage.getItem('loggedUser') || null;
  }

  getUserRole() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const loggedUser = this.loggedUserName;
    const user = users.find((u: { fullName: string }) => u.fullName === loggedUser);

    this.userRole = user ? user.role : null;
    console.log('Rol del usuario:', this.userRole);
  }

  agregarAlumno() {
    if (this.userRole !== 'Profesor') {
      console.error('Solo los profesores pueden agregar alumnos.');
      return;
    }

    if (!this.nombreAlumno.trim()) {
      console.error('El nombre del alumno es obligatorio.');
      return;
    }

    const nuevoAlumno: ALUMNO = {
      id: (Math.random() * 100000).toFixed(0),
      idSala: this.salaID,
      nombre: this.nombreAlumno.trim(),
      asistencia: false,
    };

    const sala = this.salaService.getSalaWithId(this.salaID);
    if (sala) {
      sala.alumnos = sala.alumnos || [];
      const existe = sala.alumnos.some((a) => a.nombre === nuevoAlumno.nombre);
      if (!existe) {
        sala.alumnos.push(nuevoAlumno);
        this.salaService.addAlumno(this.salaID, nuevoAlumno);
        this.alumnos = sala.alumnos;
      } else {
        console.warn('El alumno ya existe:', nuevoAlumno);
      }
    }

    this.nombreAlumno = '';
  }

  generarQRCode() {
    if (this.userRole !== 'Profesor') {
      console.error('Solo los profesores pueden generar códigos QR.');
      return;
    }

    QRCode.toDataURL(this.salaID)
      .then((url) => {
        this.qrCodeUrl = url;
      })
      .catch((err) => {
        console.error('Error al generar el código QR:', err);
      });
  }

  marcarAsistencia(alumnoID: string) {
    const sala = this.salaService.getSalaWithId(this.salaID);
    if (sala) {
      const alumno = sala.alumnos?.find((a) => a.id === alumnoID);
      if (alumno) {
        alumno.asistencia = !alumno.asistencia;
        this.salaService.updateSala(this.salaID, sala);
      } else {
        console.error(`Alumno con ID ${alumnoID} no encontrado.`);
      }
    }
  }
}
