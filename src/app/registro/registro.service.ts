import { Injectable } from '@angular/core';
import { HttpUserService } from '../Services/http-user.service';
import { userInterface } from '../Services/interface/userDto';
import { alumnoInterface } from '../Services/interface/alumno.dto';
import { AlumnosControlService } from '../Services/alumnos-control.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private storageKey = 'users'; 

  constructor(private api:HttpUserService, private alumnoService:AlumnosControlService) {
    
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  
  async register(fullName: string, email: string, password: string, role: string): Promise<boolean> {
    const users = this.getUsers();
    const existingUser = users.find(user => user.fullName === fullName);
  
    if (existingUser) return false; 
    
    const newUser:userInterface =  {
      email,
      username: fullName,
      password
    }

    let existInDatabase = await this.api.registerUser(newUser);

    if (!existInDatabase) return false;

    const user = await this.api.getUserForCorreo(email);

    const newALumno:alumnoInterface = {
      userId:user?.id!,
      full_name: fullName,
    }

    const alumnoCreate = await this.alumnoService.crearAlumno(email, newALumno);

    if (!alumnoCreate) return false;

    users.push({ fullName, email, password, role }); // Se agrega el rol
    localStorage.setItem(this.storageKey, JSON.stringify(users));

    return true; 
  }
  
  

  
  getUsers(): { fullName: string; email: string; password: string; role: string }[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  
  logUsersToConsole(): void {
    console.log('Usuarios Registrados:', this.getUsers());
  }
}
