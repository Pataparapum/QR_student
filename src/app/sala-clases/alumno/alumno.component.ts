import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SalaService } from 'src/app/Services/sala.service';
import { ALUMNO } from '../interface/alumnoInterface';
import { AlumnosControlService } from 'src/app/Services/alumnos-control.service';
import { SALA } from '../interface/salaInterface';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
  imports: [IonicModule, FormsModule],
  standalone: true
})
export class AlumnoComponent  implements OnInit {

  @Input() salaID?:string;
  @Output() newEven = new EventEmitter<SALA[]>();

  nombreAlumno:string = "";


  constructor(private salaDB:SalaService, private alumnoControl:AlumnosControlService) { }

  ngOnInit() {}





}
