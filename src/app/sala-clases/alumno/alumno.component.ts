import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SalaService } from 'src/app/Services/sala.service';
import { ALUMNO } from '../interface/alumnoInterface';
import { AlumnosControlService } from 'src/app/Services/alumnos-control.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
  imports: [IonicModule, FormsModule],
  standalone: true
})
export class AlumnoComponent  implements OnInit {

  @Input() salaID?:number;

  nombreAlumno:string = "";


  constructor(private salaDB:SalaService, private alumnoControl:AlumnosControlService) { }

  ngOnInit() {}


  agregarAlumnos(event:any){
    let button:HTMLElement = event.target!;
    let id:number = parseInt(button.id);
    let alumno:ALUMNO = this.alumnoControl.crearAlumno(this.nombreAlumno, id);
    

    this.salaDB.addAlumno(id, alumno);

    this.alumnoControl.incrementId()
    this.nombreAlumno = "";
  }



}
