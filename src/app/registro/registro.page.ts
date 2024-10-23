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

  register(event: MouseEvent) {
    event.preventDefault();
    this.errorMessage = null;

    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const success = this.registroService.register(
      this.registerForm.fullName,
      this.registerForm.email,
      this.registerForm.password
    );

    if (success) {
      console.log('Registro exitoso');
      this.logUsers(); //imprimir usuarios registrados
      this.router.navigate(['/login']); // Redirigir al login
    } else {
      this.errorMessage = 'El usuario ya está registrado';
    }
  }

  logUsers() {
    // Imprimir usuarios en la consola
    console.log(JSON.parse(localStorage.getItem('users') || '[]'));
  }
}
