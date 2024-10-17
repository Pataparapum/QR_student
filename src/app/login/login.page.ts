import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm = {
    userName: "",
    password: ""
  }

  user: userInterface | null = null

  constructor(private router:Router) {
    this.userForm.userName = "";
    this.userForm.password = "";
  }

  navigateToAbout() {
    this.router.navigate(['/home']);
  }

  errorMessage(error:string) {
    let p:HTMLParagraphElement = <HTMLParagraphElement> document.getElementById('error');
    p.innerText = error
  };

  userLogin(event:MouseEvent) {
    let error:HTMLParagraphElement = <HTMLParagraphElement> document.getElementById('error');
    error.innerText = "";
    event.preventDefault
    console.log(this.userForm.userName.length);
    console.log(this.userForm.password.length);

    if(this.userForm.userName.length > 12 || this.userForm.userName.length < 6) {
      let message = "el largo del nombre debe ser mayor a 6 y menor o igual a 12"
      this.errorMessage(message);
      this.userForm.userName = "";
    } else if (this.userForm.password.length > 40 || this.userForm.password.length < 6) {
      let message = "La contraseña no puede estar vacia, y no puede ser menor a 6 o mayor a 40 caracteres"
      this.errorMessage(message)
      this.userForm.password = "";
    } else{
      this.user = {
        userName : this.userForm.userName,
        password: this.userForm.password
      }
      this.navigateToAbout()
    } 
  }

  ngOnInit() {
    
  }

}
