import { Data } from '@angular/router';
import { alumnoInterface } from './interface/alumno.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  marcarAsistencia(asistencia:asistenciaInterface) {
    let marcarAsistencia = this.api.post(`${this.asistenciaUrl}`, asistencia)

    let setAsistencia = 
      firstValueFrom(marcarAsistencia)
      .then((data:any) => {
        return true;
      })
      .catch(err => {
        return false;
      })

    return setAsistencia
  }

  async alumnoExiste(userId:string) {
    let datos = this.api.get<alumnoInterface[]>(`${this.alumnosUrl}`)

    let alumnos:alumnoInterface[] = 
      await firstValueFrom(datos)
        .then(data => {
          return data;
        })

    for (let alumno of alumnos) {
      if (alumno.userId === userId) return alumno.id;
    }

    return undefined;
  }
    
}
