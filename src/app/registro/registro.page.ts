import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  //Revisar con cristopher - 
  registerUser = {
    userName : " ",
    lastName : "",
    curso : "",
    rut : ""
  }

  constructor() { }

  ngOnInit() {
  }

}
