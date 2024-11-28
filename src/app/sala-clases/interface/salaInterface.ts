import { ALUMNO } from './alumnoInterface';

interface SALA {
    nombre: string;
    id: string;
    alumnos?: ALUMNO[];
    fechaCreacion?: string; // Nuevo atributo para guardar la fecha
  }
  

export {SALA}