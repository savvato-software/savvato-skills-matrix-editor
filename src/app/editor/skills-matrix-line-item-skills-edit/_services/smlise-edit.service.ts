import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmliseEditService {

  public passedValue: string;

  constructor() {
    this.passedValue = '';
  }
}
