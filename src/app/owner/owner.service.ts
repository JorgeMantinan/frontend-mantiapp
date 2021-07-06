import { Injectable } from '@angular/core';
import { Owner } from './owner';
import { OWNERS } from './owner.json';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor() { }

  getOwners(): Owner[] { 
    return OWNERS;
  }
}
