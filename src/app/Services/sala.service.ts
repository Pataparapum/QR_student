import { Data } from '@angular/router';
import { Injectable } from '@angular/core';
import { SALA } from '../sala-clases/interface/salas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';
import { alumnoInterface } from './interface/alumno.dto';
import { salaInterface } from './interface/sala.dto';
import { firstValueFrom } from 'rxjs';
import { AlumnosControlService } from './alumnos-control.service';
import { HttpUserService } from './http-user.service';
import { userInterface } from '../login/login.interface';

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

  getSalaWithName(name:string): SALA | null {
    return this.salaArray.find((sala) => sala.nombre === name) || null;
  }

  async addAlumno(id: string, correo:string, alumnoid:string) {
    const sala: SALA = this.getSalaWithId(id)!;

    if (!sala.salas) sala.salas = [];

    const alumno:salaInterface = {
      curso: sala.nombre,
      alumnoid: alumnoid!
    }

    const opciones = {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Authorization':`Bearer ${localStorage.getItem('token')!}`
      })
        
    }

    const allAlumnos = this.api.post(`${this.url}` ,alumno, opciones);

    const data =
      await firstValueFrom(allAlumnos)
        .then((data:any) => {
          return data.data
        }).catch(err => {
           return err
        })
    

    sala.salas.push(alumno);
    this.Storage.set('salas', this.salaArray);
    
    return data;
  }

  findAlumnoForId(alumnoId: string, salaId: string): salaInterface | null {
    const sala = this.getSalaWithId(salaId);
    return sala?.salas?.find((alumno) => alumno.alumnoid === alumnoId) || null;
  }

  async getAllAlumnosOfSala(salaName:string) {
    const opciones = {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Authorization':`Bearer ${localStorage.getItem('token')!}`
      })
        
    }

    const alumnos = this.api.get(`${this.url}/cursos/${salaName}`, opciones);

    const data = await firstValueFrom(alumnos).then((data:any) => {
      return data.alumno;
    });

    if (data) return data
    return [];
  }

  async delete(salaId: string) {
    const opciones = {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Authorization':`Bearer ${localStorage.getItem('token')!}`
      })
        
    }

    this.salaArray = this.salaArray.filter((sala) => sala.id !== salaId);

    let borrar = this.api.delete(`${this.url}/${salaId}`,opciones);

    const dato = await firstValueFrom(borrar).then();

    this.Storage.set('salas', this.salaArray); // Actualizar el almacenamiento
  }

  async updateSala(salaID: string, updatedSala: SALA) {
    const index = this.salaArray.findIndex((sala) => sala.id === salaID);

    if (index !== -1) {
      this.salaArray[index] = updatedSala; // Actualiza la sala en el array

      const opciones = {
        headers: new HttpHeaders({
          'Content-Type': 'aplication/json',
          'Authorization':`Bearer ${localStorage.getItem('token')!}`
        })
          
      }
      
      let update = this.api.put(`${this.url}/${salaID}`, updatedSala.salas, opciones);

      const dato = await firstValueFrom(update).then()

      this.Storage.set('salas', this.salaArray); // Guarda los cambios en StorageService
    } else {
      console.error(`No se encontró la sala con ID: ${salaID}`);
    }
  }
}
