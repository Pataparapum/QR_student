import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from '../Services/sala.service';
import { ALUMNO } from '../sala-clases/interface/alumnoInterface';
import { FormsModule } from '@angular/forms';
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
  qrCodeUrl: string = ''; // Variable para almacenar la URL del QR generado

  constructor(private route: ActivatedRoute, private salaService: SalaService) {}

  ngOnInit() {
    this.salaID = this.route.snapshot.paramMap.get('id') || '';
    const sala = this.salaService.getSalaWithId(this.salaID);

    if (sala) {
      this.salaNombre = sala.nombre;
      this.alumnos = sala.alumnos || [];
    }
  }

  agregarAlumno() {
    console.log('Método agregarAlumno llamado'); // Depuración
    if (!this.nombreAlumno.trim()) {
      console.error('El nombre del alumno es obligatorio');
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
      
      // Verificar si ya existe el alumno antes de agregarlo
      const existe = sala.alumnos.some((a) => a.nombre === nuevoAlumno.nombre);
      if (!existe) {
        sala.alumnos.push(nuevoAlumno);
        this.salaService.addAlumno(this.salaID, nuevoAlumno);
        this.alumnos = sala.alumnos; // Actualizar la lista local
      } else {
        console.warn('El alumno ya existe:', nuevoAlumno);
      }
    }

    this.nombreAlumno = '';
  }

  generarQRCode() {
    QRCode.toDataURL(this.salaID)
      .then((url) => {
        this.qrCodeUrl = url; // Guardar la URL generada
      })
      .catch((err) => {
        console.error('Error al generar el código QR:', err);
      });
  }

  marcarAsistencia(alumnoID: string) {
    const sala = this.salaService.getSalaWithId(this.salaID);
    if (sala) {
      sala.alumnos = sala.alumnos || []; // Asegura que 'alumnos' no sea undefined
      const alumno = sala.alumnos.find((a) => a.id === alumnoID);
      if (alumno) {
        alumno.asistencia = !alumno.asistencia; // Alterna el estado de asistencia
        this.salaService.updateSala(this.salaID, sala); // Guarda los cambios en localStorage
        console.log(`Asistencia actualizada para ${alumno.nombre}: ${alumno.asistencia}`);
      } else {
        console.error(`Alumno con ID ${alumnoID} no encontrado.`);
      }
    } else {
      console.error(`Sala con ID ${this.salaID} no encontrada.`);
    }
  }
  
  

  

  
}
