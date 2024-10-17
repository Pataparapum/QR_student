import { Injectable } from '@angular/core';
import { userInterface } from '../login/login.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  auth:boolean

  constructor(private storage:StorageService) { this.auth = false}

  async Authenticar(user:string) {
    let val:userInterface = await this.storage.get(user);
    if (val) {
      this.auth = true;
    }
  }

  isAuthenticate():boolean {
    if(this.auth) {
      return true;
    }
    return false;
  }
}
