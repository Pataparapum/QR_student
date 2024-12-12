import { salaInterface } from "src/app/Services/interface/sala.dto";

interface SALA {
    nombre: string;
    id: string;
    salas:salaInterface[];
    fechaCreacion?: string; // Nuevo atributo para guardar la fecha
  }
  

export {SALA}