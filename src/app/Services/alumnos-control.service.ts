import { SalaService } from 'src/app/Services/sala.service';
import { Injectable } from '@angular/core';
import { ALUMNO } from '../sala-clases/interface/alumnoInterface';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class AlumnosControlService {

  id:number = 0;

  constructor() { }

  crearAlumno(nombre:string, salaId:string): ALUMNO {

    let alumno:ALUMNO = {
      nombre:nombre,
      id: uuidv4(),
      idSala:salaId,
      asistencia: false
    };


    return alumno;
  }
    
}
