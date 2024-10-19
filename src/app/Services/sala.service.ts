import { Injectable } from '@angular/core';
import { SALA } from '../sala-clases/interface/salaInterface';
import { ALUMNO } from '../sala-clases/interface/alumnoInterface';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  id:number = 0;

  salaArray:SALA[] = [];

  constructor() { }

  push(sala:SALA) {
    if (this.id == 0) {
      this.salaArray.push(sala);
      this.id++;
    } else {
      sala.id = this.id;
      this.salaArray.push(sala);
      this.id ++
    }
    
  }

  get():SALA[] {
    return this.salaArray;
  }

  getSalaWithId(id:number):SALA | null {
    for(let sala of this.salaArray) {
      if (sala.id == id) {
        let s:SALA = sala;
        return s;
      }
    }
    return null;
  }

  addAlumno(id:number, alumno:ALUMNO){
    let sala = this.getSalaWithId(id)
    
    sala?.alumnos?.push(alumno);
  }

  findAlumnoForId(alumnoId:number, salaId:number):ALUMNO  | null {
    let sala = this.getSalaWithId(salaId)!;
    for (let alumno of sala?.alumnos!) {
      if(alumno.id == alumnoId) {
        let alumnoActual = alumno;
        return alumnoActual;
      }
    }
    return null;
  }
}
