import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
;
import { SALA } from '../sala-clases/interface/salaInterface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage!:Storage;

  constructor(private storage:Storage) {
    this.init()
   }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set<t>(key:string, value:t) {
    await this._storage?.set(key, value)
  }

  public async remove(key:string) {
    this.storage.remove(key);
  }

  async get(key:string): Promise<SALA[]> {
    const data = await this.storage.get(key)
    return data;
  }
}
