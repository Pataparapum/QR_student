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

  constructor(private api:HttpUserService) {
    
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  
  async register(fullName: string, email:string, password: string, role: string): Promise<boolean> {
    const users = this.getUsers();
    const existingUser = users.find(user => user.fullName === fullName);
  
    if (existingUser) return false; 
    
    const newUser:userInterface =  {
      email,
      username: fullName,
      password,
      rol: role
    }

    let existInDatabase = await this.api.registerUser(newUser);

    if (!existInDatabase)  return false;



    users.push({ fullName, email, password, role }); // Se agrega el rol
    const userData = await this.api.getUserForCorreo(email);
    localStorage.setItem(this.storageKey, JSON.stringify(userData));

    return true; 
  }
  
  

  
  getUsers(): { fullName: string; email: string; password: string; role: string }[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  
  logUsersToConsole(): void {
    console.log('Usuarios Registrados:', this.getUsers());
  }
}
