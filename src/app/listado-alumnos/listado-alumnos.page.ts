import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from '../Services/sala.service';
import { AlertController } from '@ionic/angular';
import * as QRCode from 'qrcode';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { alumnoInterface } from '../Services/interface/alumno.dto';
import { AlumnosControlService } from '../Services/alumnos-control.service';
import { asistenciaInterface } from '../Services/interface/asistencia.dto';

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
  nombreAlumno: string = '';
  correo:string = '';
  qrCodeUrl: string = '';
  loggedUserName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private salaService: SalaService,
    private alumnoService: AlumnosControlService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.salaID = this.route.snapshot.paramMap.get('id') || '';
    this.cargarSala(); // Encapsular la lógica en un método para claridad
    this.getLoggedUserName();
  }

  cargarSala() {
    const sala = this.salaService.getSalaWithId(this.salaID);

    if (sala) {
      this.salaNombre = sala.nombre; // Asegurarse de que el nombre se asigne correctamente
      this.alumnos = sala.alumnos || [];
    } else {
      console.error('No se encontró la sala con el ID proporcionado.');
    }
  }

  getLoggedUserName() {
    this.loggedUserName = localStorage.getItem('loggedUser') || null;
  }

  async agregarAlumno() {
    if (!this.nombreAlumno.trim()) {
      console.error('El nombre del alumno es obligatorio');
      return;
    }

    const nuevoAlumno: alumnoInterface = {
      full_name: this.nombreAlumno.trim(),
      userId:""
    };

    const sala = this.salaService.getSalaWithId(this.salaID);
    if (sala) {
      sala.alumnos = sala.alumnos || [];
      const existe = sala.alumnos.some((a:alumnoInterface) => a.full_name === nuevoAlumno.full_name);
      if (!existe) {
        const alumno:alumnoInterface | undefined = await this.alumnoService.crearAlumno(this.correo, nuevoAlumno)

        if (alumno){
          sala.alumnos.push(alumno);
          this.salaService.addAlumno(this.salaID, alumno);
          this.alumnos = sala.alumnos;
        } else console.warn('error al marcar la asistencia');
        
      } else {
        console.warn('El alumno ya existe:', nuevoAlumno);
      }
    }

    this.nombreAlumno = '';
  }

  generarQRCode() {
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
      const alumno = sala.alumnos?.find((a:alumnoInterface) => a.userId === alumnoID);
      if (alumno) {
        this.asiste.asistencia = true
        this.asiste.alumnoId = alumno.id!
        this.salaService.updateSala(this.salaID, sala);
      } else {
        console.error(`Alumno con ID ${alumnoID} no encontrado.`);
      }
    }
  }
}
