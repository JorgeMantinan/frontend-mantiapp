import { Injectable } from '@angular/core';
import { Owner } from './owner';
//import { OWNERS } from './owner.json';
// Is used for make objects string for use like Observable manage for big data
// Observable is for change so fast the data
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private urlEndPoint: string = 'http://localhost:8080/api/owners';

  constructor(private http: HttpClient) { }

  getOwners(): Observable <Owner[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Owner[])
    );
  }
}
