import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from './login.interface';
import { StorageService } from '../Services/storage.service';
import { AuthenticateService } from '../Services/authenticate.service';
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

  constructor(private router: Router, private storage: StorageService, private authService: AuthenticateService, private api:HttpUserService) {}

  ngOnInit() {}

  navigateToAbout() {
    this.router.navigate(['/home']);
  }

  userLogin(event: MouseEvent) {
    
    event.preventDefault();
    this.errorMessage = null;

    const { userName, password } = this.userForm;
    if (this.authService.login(userName, password)) {
      this.navigateToAbout();
    } else {
      this.errorMessage = 'Credenciales inválidas';
    }
  }
}
