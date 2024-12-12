import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from './login.interface';
import { AuthenticateService } from '../Services/authenticate.service';
import { AlertController } from '@ionic/angular';
import { HttpUserService } from '../Services/http-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userForm = {
    correo: '',
    password: ''
  };

  user: userInterface | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthenticateService, private alertCtrl: AlertController, private api:HttpUserService) {}

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

    const { correo, password } = this.userForm;

    // Validaciones
    if (!correo) {
      this.errorMessage = 'El nombre correo del usuario es requerido';
      await this.presentAlert(this.errorMessage);
      return;
    }

    if (!password) {
      this.errorMessage = 'La contraseña es requerida';
      await this.presentAlert(this.errorMessage);
      return;
    }

    let userExist = await this.authService.ingresar(correo, password)
    if (userExist) {
      
      localStorage.setItem('loggedUser', correo); 

      console.log('Usuario logueado: ', correo);  

      await this.presentAlert('Login exitoso');
      
      this.userForm.password = "";
      this.userForm.correo = "";

      this.navigateToAbout();
    } else {
      await this.presentAlert('Credenciales inválidas');
    }
  }

  navigateToAbout() {
    this.router.navigate(['/home']);
  }
}
