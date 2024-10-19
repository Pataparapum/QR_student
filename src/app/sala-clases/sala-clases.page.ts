import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SALA } from './interface/salaInterface';
import { SalaService } from '../Services/sala.service';
import { MatCard } from '@angular/material/card';
import { Event } from '@angular/router';
import { ALUMNO } from './interface/alumnoInterface';
import { AlumnosControlService } from '../Services/alumnos-control.service';

@Component({
  selector: 'app-sala-clases',
  templateUrl: './sala-clases.page.html',
  styleUrls: ['./sala-clases.page.scss'],
})
export class SalaClasesPage implements OnInit {

  salaArray:SALA[] = [];
  
  //Atributos sala
  sala:SALA = {
    nombre:"",
    id: 0
  }


  //Atributos alumnos
  nombreAlumno: string = "";


  constructor(private salaDB:SalaService, private alumnoControl:AlumnosControlService) {}

  ngOnInit() {
  }

  crearSala(){
    let nuevaSala:SALA =  {
      nombre:this.sala.nombre,
      id:this.sala.id,
      alumnos:[]
    }

    this.salaDB.push(nuevaSala);   
    this.salaArray = this.salaDB.get();
  }

  agregarAlumnos(event:any){
    let button:HTMLElement = event.target!;
    let id:number = parseInt(button.parentElement?.parentElement?.id!);
    let alumno:ALUMNO = this.alumnoControl.crearAlumno(this.nombreAlumno, id);
    

    this.salaDB.addAlumno(id, alumno);

    this.alumnoControl.incrementId()
  }

  marcarAsistencia(id:number, salaId:number) {

    let alumno = this.salaDB.findAlumnoForId(id, salaId);
    if (alumno) {
      alumno.asistencia = true;
    }
  }




}
