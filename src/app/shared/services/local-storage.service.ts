import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
 
  add(key:string,items:string[]) {
      localStorage[key] = JSON.stringify(items) ;
  }
  
  getByItem(key:string):any{
    const storageItem = JSON.parse(localStorage[key]);
    return storageItem;
  }

  remove(key:string){
    localStorage.removeItem(key);
  }

 
}
