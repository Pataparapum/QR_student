import { Data } from '@angular/router';
import { alumnoInterface } from './interface/alumno.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { asistenciaInterface } from './interface/asistencia.dto';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import { userInterface } from '../login/login.interface';


@Injectable({
  providedIn: 'root'
})
export class AlumnosControlService {

  alumnosUrl = "https://qrstudent-api.vercel.app/alumnos";
  asistenciaUrl = "https://qrstudent-api.vercel.app/asistencia";

  constructor(private api:HttpClient) { }

  alumno:alumnoInterface = {
    full_name:"",
    userId:""
  }

  async crearAlumno(correo:string, nuevoAlumno:alumnoInterface)  {
     let add = this.api.post<alumnoInterface>(`${this.alumnosUrl}/${correo}`, nuevoAlumno)
      
     const alumno = 
      await firstValueFrom(add)
        .then( (data:alumnoInterface) => {
          return data;
          
        }).catch(err => {
          return undefined
        });

    return alumno
  }

  async marcarAsistencia(asistencia:asistenciaInterface) {
    const opciones = {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Authorization':`Bearer ${localStorage.getItem('token')!}`
      })
        
    }
    
    let marcarAsistencia = this.api.post(`${this.asistenciaUrl}`, asistencia, opciones)

    let setAsistencia = 
      await firstValueFrom(marcarAsistencia)
      .then((data:any) => {
        return true;
      })
      .catch(err => {
        return false;
      })

    return setAsistencia
  }

  async alumnoExiste(userId:string) {

    const opciones = {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Authorization':`Bearer ${localStorage.getItem('token')!}`
      })
    }

    let datos = this.api.get<alumnoInterface[]>(`${this.alumnosUrl}`, opciones)

    let alumnos:alumnoInterface[] = 
      await firstValueFrom(datos)
        .then((data:any) => {
          return data.data;
        })

    for (let index = 0; index < alumnos.length; index++) {      
      if (alumnos[index].userId == userId) return alumnos[index].id;
    }

    return undefined;
  }
  
  async getAlumnoForId(userId:string) {
    const opciones = {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Authorization':`Bearer ${localStorage.getItem('token')!}`
      })
    }

    let alumno = this.api.get(`${this.alumnosUrl}/${userId}`, opciones);

    let datos = await firstValueFrom(alumno).then((data:any) => {return data.data});

    return datos
  }
}
