import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { userInterface } from '../login/login.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage:Storage | null = null;

  constructor(private storage:Storage) {
    this.init()
   }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key:string, value:userInterface) {
    this._storage?.set(key, value)
  }

  public get(key:string) {
    return this._storage?.get(key);
  }
}
