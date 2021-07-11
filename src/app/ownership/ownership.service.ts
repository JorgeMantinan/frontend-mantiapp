import { Injectable } from '@angular/core';
import { Ownership } from './ownership';
// Is used for make objects string for use like Observable manage for big data
// Observable is for change so fast the data
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnershipService {

  private urlEndPoint: string = 'http://localhost:8080/api/ownership';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application-json'})

  constructor(private http: HttpClient) { }

  getOwnerships(): Observable <Ownership[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Ownership[])
    );
  }

  createOwnership(ownership: Ownership) : Observable<Ownership> {
    // This send the url, the object and the header
    return this.http.post<Ownership>(this.urlEndPoint, ownership, {headers: this.httpHeaders});
  }

  getOwnership(id: any): Observable<Ownership>{
    return this.http.get<Ownership>(`${this.urlEndPoint}/${id}`)
  }

}
