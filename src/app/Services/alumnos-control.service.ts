import { Injectable } from '@angular/core';
import { ALUMNO } from '../sala-clases/interface/alumnoInterface';


@Injectable({
  providedIn: 'root'
})
export class AlumnosControlService {

  id:number = 0;

  constructor() { }

  crearAlumno(nombre:string, salaId:number): ALUMNO {
    let alumno:ALUMNO = {
      nombre:nombre,
      id: this.id,
      idSala:salaId,
      asistencia: false
    };


    return alumno;
  }

  incrementId() {
    this.id++;
  }
}
