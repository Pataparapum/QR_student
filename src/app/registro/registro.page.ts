import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from './registro.service';
import { AlumnosControlService } from '../Services/alumnos-control.service';
import { alumnoInterface } from '../Services/interface/alumno.dto';
import { HttpUserService } from '../Services/http-user.service';
import { logInterface } from '../Services/interface/logDto';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' // Nuevo campo para el rol
  };

  errorMessage: string | null = null;

  constructor(
    private registroService: RegistroService,
    private router: Router,
    private userService:HttpUserService,
    private alumnoService:AlumnosControlService) {}

  ngOnInit() {}

  validateEmail(email: string): boolean {
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async register(event: MouseEvent) {
    event.preventDefault();
    this.errorMessage = null;
  
    const { fullName, email, password, confirmPassword, role } = this.registerForm;
  
    if (!fullName) {
      this.errorMessage = 'El nombre completo es requerido';
      return;
    }
  
    if (!email || !this.validateEmail(email)) {
      this.errorMessage = 'Por favor, introduce un correo electrónico válido';
      return;
    }
  
    if (!password || password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }
  
    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }
  
    if (!role) {
      this.errorMessage = 'Por favor, selecciona tu rol';
      return;
    }
  
    const success = await this.registroService.register(fullName, email, password, role);
  
    if (success) {  
      this.logUsers();

      let userId = await this.userService.getUserForCorreo(email);

      const newALumno:alumnoInterface = {
        userId:userId?.id!,
        full_name: fullName,
      }

      let alumno = await this.alumnoService.crearAlumno(email, newALumno)

      this.registerForm = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      };

      let login:logInterface = {
        email: email,
        password: password
      }

      await this.userService.login(login);
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'El usuario ya está registrado';
    }
  }
  

  logUsers() {
    console.log(JSON.parse(localStorage.getItem('users') || '[]'));
  }
}
