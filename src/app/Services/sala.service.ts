import { Injectable } from '@angular/core';
import { SALA } from '../sala-clases/interface/salaInterface';
import { ALUMNO } from '../sala-clases/interface/alumnoInterface';
import { StorageService } from './storage.service';
import { firstValueFrom, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  salaArray:SALA[] = [];

  constructor(private Storage:StorageService){
     this.getData()
  };

  async getData() {
    await this.Storage.get('salas').then((r) => {
      if (r) {
        this.salaArray = r;
      }
    })
  }

  push(sala:SALA) {
    sala.id = uuidv4();
    this.salaArray.push(sala);
    this.Storage.set('salas', this.salaArray);
  }

  async get() {
    await this.getData();
    if (this.salaArray) {
      return this.salaArray;
    } else {
      return [];
    }
    
  }

  getSalaWithId(id:string): SALA | null {
    for(let sala of this.salaArray) {
      if (sala.id == id) {
        let s:SALA = sala;
        return s;
      }
    }
    return null;
  }

  addAlumno(id:string, alumno:ALUMNO){
    let sala:SALA = this.getSalaWithId(id)!;

    sala?.alumnos?.push(alumno);

    this.Storage.set('salas', this.salaArray);    
    return this.salaArray;
  }

  findAlumnoForId(alumnoId:string, salaId:string):ALUMNO  | null {
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
