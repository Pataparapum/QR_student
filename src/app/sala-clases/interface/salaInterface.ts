import { ALUMNO } from './alumnoInterface';

interface SALA {
    nombre:string,
    id:string,
    alumnos?:ALUMNO[]
}

export {SALA}