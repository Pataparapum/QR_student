import { Injectable } from '@angular/core';
import { SALA } from '../sala-clases/salaInterface';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  id:number = 0;

  salaArray:SALA[] = [];

  constructor() { }

  push(sala:SALA) {
    if (this.id == 0) {
      this.salaArray.push(sala);
      this.id++;
    } else {
      sala.id = this.id;
      this.salaArray.push(sala);
      this.id ++
    }
    
  }

  get():SALA[] {
    return this.salaArray;
  }

  getWithId(id:number) {
    for(let sala of this.salaArray) {
      if (sala.id == id) {
        return sala;
      }
    }

    return "No hay sala"
  }
}
