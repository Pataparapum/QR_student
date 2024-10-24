import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SALA } from './interface/salaInterface';
import { SalaService } from '../Services/sala.service';
import { MatCard } from '@angular/material/card';
import { Event, Router } from '@angular/router';
import { ALUMNO } from './interface/alumnoInterface';
import { AlumnosControlService } from '../Services/alumnos-control.service';

@Component({
  selector: 'app-sala-clases',
  templateUrl: './sala-clases.page.html',
  styleUrls: ['./sala-clases.page.scss'],
})
export class SalaClasesPage implements OnInit, OnChanges {

  salaArray:SALA[] = [];
  
  //Atributos sala
  sala:SALA = {
    nombre:"",
    id:""
  }

  //Atributos alumnos
  nombreAlumno: string = "";


  constructor(private salaDB:SalaService, private alumnoControl:AlumnosControlService, private router:Router) {}

  async ngOnInit() {
    this.salaArray = await this.salaDB.get();
  }

  ngOnChanges(changes: SimpleChanges): void {
    changes
  }

  setSala(salas:SALA[]) {
    this.salaArray = salas;
  }

  async crearSala(){
    let nuevaSala:SALA =  {
      nombre:this.sala.nombre,
      id:this.sala.id,
      alumnos:[]
    }

    this.salaDB.push(nuevaSala);   
    this.salaArray = await this.salaDB.get();
  }

  marcarAsistencia(id:string, salaId:string) {

    let alumno = this.salaDB.findAlumnoForId(id, salaId);
    if (alumno) {
      alumno.asistencia = true;
    }
    
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    console.log('La sesión se ha cerrado correctamente');
  }

}
