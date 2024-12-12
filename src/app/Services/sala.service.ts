import { Injectable } from '@angular/core';
import { SALA } from '../sala-clases/interface/salas';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';
import { alumnoInterface } from './interface/alumno.dto';
import { salaInterface } from './interface/sala.dto';
import { firstValueFrom } from 'rxjs';
import { AlumnosControlService } from './alumnos-control.service';
import { HttpUserService } from './http-user.service';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  salaArray: SALA[] = [];

  constructor(private Storage: StorageService, private api:HttpClient, private alumnoService:AlumnosControlService, private userService:HttpUserService) {
    this.getData();
  }

  url = "https://qrstudent-api.vercel.app/salas";

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

  async addAlumno(id: string, correo:string) {
    const sala: SALA = this.getSalaWithId(id)!;

    //saber si el alumno existe en la base de datos
    let user = await this.userService.getUserForCorreo(correo);

    if (!user) console.warn('el alumno no esta ingresado:', user);

    const alumnoExist = await this.alumnoService.alumnoExiste(user?.id!) 

    if (!alumnoExist) console.warn('El alumno no esta ingresado:', alumnoExist);
    if (!sala.salas) sala.salas = [];

    const alumno:salaInterface = {
      curso: sala.nombre,
      alumnoid: alumnoExist!
    }

    // Evitar agregar duplicados
    const allAlumnos = this.api.get(`${this.url}/cursos/${sala.nombre}`);

    const existe =
      await firstValueFrom(allAlumnos)
        .then((data:any) => {
          for (let alumnos of data.data) {
            if (alumnos.alumnoid === alumno.alumnoid && alumnos.curso === alumno.curso) return true
          }
          return false;
        }).catch(err => {
          return true;
        })

    if (existe) console.warn('Intento de agregar alumno duplicado:', alumno);  

    sala.salas.push(alumno);
    this.Storage.set('salas', this.salaArray);
    
    return this.salaArray;
  }

  findAlumnoForId(alumnoId: string, salaId: string): salaInterface | null {
    const sala = this.getSalaWithId(salaId);
    return sala?.salas?.find((alumno) => alumno.alumnoid === alumnoId) || null;
  }

  async delete(salaId: string) {
    this.salaArray = this.salaArray.filter((sala) => sala.id !== salaId);

    let borrar = this.api.delete(`${this.url}/${salaId}`);

    const dato = await firstValueFrom(borrar).then();

    this.Storage.set('salas', this.salaArray); // Actualizar el almacenamiento
  }

  async updateSala(salaID: string, updatedSala: SALA) {
    const index = this.salaArray.findIndex((sala) => sala.id === salaID);

    if (index !== -1) {
      this.salaArray[index] = updatedSala; // Actualiza la sala en el array
      
      let update = this.api.put(`${this.url}/${salaID}`, updatedSala.salas);

      const dato = await firstValueFrom(update).then()

      this.Storage.set('salas', this.salaArray); // Guarda los cambios en StorageService
    } else {
      console.error(`No se encontró la sala con ID: ${salaID}`);
    }
  }
}
