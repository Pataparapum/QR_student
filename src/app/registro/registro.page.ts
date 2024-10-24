import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from './registro.service';

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
    confirmPassword: ''
  };

  errorMessage: string | null = null;

  constructor(private registroService: RegistroService, private router: Router) {}

  ngOnInit() {}

  validateEmail(email: string): boolean {
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  register(event: MouseEvent) {
    event.preventDefault();
    this.errorMessage = null;

    const { fullName, email, password, confirmPassword } = this.registerForm;

   
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

    const success = this.registroService.register(fullName, email, password);

    if (success) {
      console.log('Registro exitoso');
      this.logUsers(); 

      this.registerForm.confirmPassword = "";
      this.registerForm.email = "";
      this.registerForm.fullName = "";
      this.registerForm.password = "";

      this.router.navigate(['/login']); 
    } else {
      this.errorMessage = 'El usuario ya está registrado';
    }
  }

  logUsers() {
    console.log(JSON.parse(localStorage.getItem('users') || '[]'));
  }
}
