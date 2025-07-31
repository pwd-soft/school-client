import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResetService {

  private dataSubject = new BehaviorSubject<boolean>(false);

  setData(data: boolean) {
    this.dataSubject.next(data);
  }
  getData() {
    return this.dataSubject.asObservable();
  }

  constructor() { }
}
