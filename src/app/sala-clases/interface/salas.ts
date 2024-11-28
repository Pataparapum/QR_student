import { alumonInterface } from 'src/app/Services/interface/alumno.dto';
import { ALUMNO } from './alumno';

interface SALA {
    nombre: string;
    id: string;
    alumnos?: alumonInterface[];
    fechaCreacion?: string; // Nuevo atributo para guardar la fecha
  }
  

export {SALA}