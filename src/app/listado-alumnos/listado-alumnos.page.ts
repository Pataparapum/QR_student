import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from '../Services/sala.service';
import { AlertController } from '@ionic/angular';
import * as QRCode from 'qrcode';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { alumnoInterface } from '../Services/interface/alumno.dto';
import { AlumnosControlService } from '../Services/alumnos-control.service';
import { asistenciaInterface } from '../Services/interface/asistencia.dto';
import { salaInterface } from '../Services/interface/sala.dto';
import { HttpUserService } from '../Services/http-user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.page.html',
  styleUrls: ['./listado-alumnos.page.scss'],
})
export class ListadoAlumnosPage implements OnInit {
  alumnos: alumnoInterface[] = [];
  asiste:asistenciaInterface = {
    salaId: "",
    alumnoId: "",
    asistencia: false,
    justificado: false
  }
  salaID: string = '';
  salaNombre: string = ''; // Este valor debe inicializarse correctamente
  correo:string = '';
  qrCodeUrl: string = '';
  loggedUserName: string | null = null;
  userRole: string | null = null; // Para controlar el rol del usuario

  constructor(
    private route: ActivatedRoute,
    private salaService: SalaService,
    private alumnoService: AlumnosControlService,
    private alertController: AlertController,
    private userService:HttpUserService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.salaID = params['id'];
    })
    this.cargarSala(); // Encapsular la lógica en un método para claridad
    this.getLoggedUserName();
    this.getUserRole(); // Obtener el rol del usuario
  }

  
  async cargarSala() {
    const sala = this.salaService.getSalaWithId(this.salaID);
    const getAlumnos = await this.salaService.getAllAlumnosOfSala(sala?.nombre!);
    

    if (sala) {
      this.salaNombre = sala.nombre; // Asegurarse de que el nombre se asigne correctamente
      this.alumnos = getAlumnos;
    } else {
      console.error('No se encontró alumnos en la sala actual proporcionado.');
    }
  }

  getLoggedUserName() {
    this.loggedUserName = localStorage.getItem('loggedUser') || null;
  }

  getUserRole() {
    let user = JSON.parse(localStorage.getItem('users')!)
    this.userRole = user.rol
  }

  async agregarAlumno() {
    if (!this.correo.trim()) {
      console.error('El correo del alumno es obligatorio');
      return;
    }

    let user = await this.userService.getUserForCorreo(this.correo);

    let userId = user.id

    const alumno = await this.alumnoService.alumnoExiste(userId)      

    const sala = this.salaService.getSalaWithId(this.salaID);

    console.log(sala, alumno);
    

    if (sala && alumno) {
      sala.salas = sala.salas || [];
      console.log(sala.salas);
      
      const existe = sala.salas.some((a:salaInterface) => a.alumnoid === alumno);
      
      if (!existe) {
        let data = await this.salaService.addAlumno(sala.id, this.correo, alumno);

        this.addAlumnoInScreen(alumno);
        
      } else {
        console.warn('El alumno ya existe:', alumno);
      }
    }

    

    this.correo = '';
  }

  async addAlumnoInScreen(alumnoid:string) {
    let alumno = await this.alumnoService.getAlumnoForId(alumnoid);
    this.alumnos.push(alumno);
  }

  generarQRCode() {
    if (this.userRole !== 'Profesor') {
      console.error('Solo los profesores pueden generar códigos QR.');
      return;
    }

    QRCode.toDataURL(this.salaID)
      .then((url) => {
        this.qrCodeUrl = url;
      })
      .catch((err) => {
        console.error('Error al generar el código QR:', err);
      });
  }

  marcarAsistencia(alumnoID: string) {
    const sala = this.salaService.getSalaWithId(this.salaID);
    if (sala) {
      const alumno = sala.salas?.find((a:salaInterface) => a.alumnoid === alumnoID);
      if (alumno) {
        this.asiste.asistencia = true
        this.asiste.alumnoId = alumno.alumnoid!
        this.salaService.updateSala(this.salaID, sala);
      } else {
        console.error(`Alumno con ID ${alumnoID} no encontrado.`);
      }
    }
  }
}
