import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticateService } from '../Services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private auth:AuthenticateService) { }

  canActivate():boolean {
    return this.auth.isAuthenticate();
  }
}
