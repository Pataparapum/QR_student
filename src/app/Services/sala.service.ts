import { Injectable } from '@angular/core';
import { SALA } from '../sala-clases/interface/salaInterface';
import { ALUMNO } from '../sala-clases/interface/alumnoInterface';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  salaArray: SALA[] = [];

  constructor(private Storage: StorageService) {
    this.getData();
  }

  async getData() {
    await this.Storage.get('salas').then((r) => {
      if (r) {
        this.salaArray = r;
      }
    });
  }

  push(sala: SALA) {
    sala.id = uuidv4();
    this.salaArray.push(sala);
    this.Storage.set('salas', this.salaArray);
  }

  async get() {
    await this.getData();
    return this.salaArray || [];
  }

  getSalaWithId(id: string): SALA | null {
    return this.salaArray.find((sala) => sala.id === id) || null;
  }

  addAlumno(id: string, alumno: ALUMNO) {
    console.log('addAlumno ejecutado para:', alumno);

    const sala: SALA = this.getSalaWithId(id)!;

    if (!sala.alumnos) {
      sala.alumnos = [];
    }

    // Evitar agregar duplicados
    const existe = sala.alumnos.some((a) => a.id === alumno.id);
    if (!existe) {
      sala.alumnos.push(alumno);
      this.Storage.set('salas', this.salaArray);
    } else {
      console.warn('Intento de agregar alumno duplicado:', alumno);
    }

    return this.salaArray;
  }

  findAlumnoForId(alumnoId: string, salaId: string): ALUMNO | null {
    const sala = this.getSalaWithId(salaId);
    return sala?.alumnos?.find((alumno) => alumno.id === alumnoId) || null;
  }

  delete(salaId: string) {
    this.salaArray = this.salaArray.filter((sala) => sala.id !== salaId);
    this.Storage.set('salas', this.salaArray); // Actualizar el almacenamiento
  }

  updateSala(salaID: string, updatedSala: SALA) {
    const index = this.salaArray.findIndex((sala) => sala.id === salaID);

    if (index !== -1) {
      this.salaArray[index] = updatedSala; // Actualiza la sala en el array
      this.Storage.set('salas', this.salaArray); // Guarda los cambios en StorageService
    } else {
      console.error(`No se encontró la sala con ID: ${salaID}`);
    }
  }
}
