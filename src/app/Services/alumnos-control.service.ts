import { Data } from '@angular/router';
import { alumonInterface } from './interface/alumno.dto';
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

  alumno:alumonInterface = {
    full_name:"",
    userId:""
  }

  crearAlumno(correo:string, alumno:alumonInterface): alumonInterface {
     this.api.post<alumonInterface>(`${this.alumnosUrl}/${correo}`, alumno).pipe(
      map((resp) => {
        alumno.id = resp.id
        alumno.full_name = resp.full_name,
        alumno.userId = resp.userId
      }),
    )
    return alumno
  }

  marcarAsistencia(asistencia:asistenciaInterface) {
    return this.api.post(`${this.asistenciaUrl}`, asistencia).subscribe((data:any) => {
      if (data.status == 201) return true;
      return false;
    })
  }
    
}
