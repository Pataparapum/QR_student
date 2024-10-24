import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  constructor(private api:HttpClient) { }

  async registerUser(username:string, password:string, email: string) {
    let user = await this.api.post(`https://registr-api.fly.dev/user/create`, {
      "name":`user ${username}`,
      "groupId": 4,
      "password":password,
      "email":email
    });
  }

  async login(username:string, email:string) {
    let user = await this.api.post(`https://registr-api.fly.dev/user/login`, {
      grupoId: 4,
      username:username,
      email:email
    });
  }

  
}
