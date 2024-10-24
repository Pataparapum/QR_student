import { ALUMNO } from './alumnoInterface';

interface SALA {
    nombre:String,
    id:string,
    alumnos?:ALUMNO[]
}

export {SALA}