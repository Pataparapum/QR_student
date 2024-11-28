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
    userName: '',
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

    const { userName, password } = this.userForm;

    // Validaciones
    if (!userName) {
      this.errorMessage = 'El nombre de usuario es requerido';
      await this.presentAlert(this.errorMessage);
      return;
    }

    if (!password) {
      this.errorMessage = 'La contraseña es requerida';
      await this.presentAlert(this.errorMessage);
      return;
    }

    if (this.authService.ingresar(userName, password)) {
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedUser', userName); 


      console.log('Usuario logueado: ', userName);  

      await this.presentAlert('Login exitoso');
      
      this.userForm.password = "";
      this.userForm.userName = "";

      this.navigateToAbout();
    } else {
      await this.presentAlert('Credenciales inválidas');
    }
  }

  navigateToAbout() {
    this.router.navigate(['/home']);
  }
}
