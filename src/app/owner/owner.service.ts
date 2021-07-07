import { Injectable } from '@angular/core';
import { Owner } from './owner';
import { OWNERS } from './owner.json';
// Is used for make objects string for use like Observable manage for big data
// Observable is for change so fast the data
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor() { }

  getOwners(): Observable <Owner[]> { 
    return of(OWNERS);
  }
}
