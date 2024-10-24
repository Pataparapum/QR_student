import { ALUMNO } from './alumnoInterface';

interface SALA {
    nombre:String,
    id:number
    alumnos?:ALUMNO[]
}

export {SALA}