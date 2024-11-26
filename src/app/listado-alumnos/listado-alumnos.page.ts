import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from '../Services/sala.service';
import { ALUMNO } from '../sala-clases/interface/alumnoInterface';

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

  marcarAsistencia(alumnoID: string) {
    console.log(`Asistencia marcada para el alumno con ID: ${alumnoID}`);
  }
}
