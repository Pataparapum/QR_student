import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from './login.interface';
import { AuthenticateService } from '../Services/authenticate.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userForm = {
    userName: '',
    password: ''
  };

  user: userInterface | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthenticateService, private alertCtrl: AlertController) {}

  ngOnInit() {}

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Login',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async userLogin(event: MouseEvent) {
    event.preventDefault();
    this.errorMessage = null;
  
    const { userName, password } = this.userForm;
  
    if (this.authService.ingresar(userName, password)) {
      // Almacena el estado de inicio de sesión y el nombre del usuario
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedUser', userName); // Guarda el nombre del usuario logueado
      
      console.log('Usuario logueado: ', userName);  // Agregamos este log para verificar
      
      await this.presentAlert('Login exitoso');
      this.navigateToAbout();
    } else {
      await this.presentAlert('Credenciales inválidas');
    }
  }
  
  
  
  
  navigateToAbout() {
    this.router.navigate(['/home']);
  }
}
