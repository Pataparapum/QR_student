import { Component, OnInit } from '@angular/core';
import { SALA } from './salaInterface';
import { SalaService } from '../Services/sala.service';

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
  alumnos: { nombre: string; presente: boolean }[] = [];
  nombreAlumno?: string;

  //Atributos asistencia

  constructor(private salaDB:SalaService) {}

  ngOnInit() {
  }

  crearSala(){
    let nuevaSala:SALA =  {
      nombre:this.sala.nombre,
      id:this.sala.id
    }

    this.salaDB.push(nuevaSala);
    console.log(this.salaDB.get());    

    this.salaArray = this.salaDB.get();
  }

  agregarAlumnos(){
    if(this.nombreAlumno){
      this.alumnos.push({nombre: this.nombreAlumno, presente: false});
      this.nombreAlumno = "";
    }

  }

  marcarAsistencia(nombre: string) {
    const alumno = this.alumnos.find(a => a.nombre === nombre);
    if (alumno) {
      alumno.presente = !alumno.presente; // Cambiar el estado de presente
      console.log(alumno)
    }
  }




}
