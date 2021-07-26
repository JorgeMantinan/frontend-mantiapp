import { Injectable } from '@angular/core';
import { Ownership } from './ownership';
// Is used for make objects string for use like Observable manage for big data
// Observable is for change so fast the data
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../owner/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OwnershipService {

  private urlEndPoint: string = 'http://localhost:8080/api/ownership';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  private addAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private notAuthorized(e: any): boolean {
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getOwnerships(): Observable <Ownership[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Ownership[])
    );
  }

  createOwnership(ownership: Ownership) : Observable<Ownership> {
    // This send the url, the object and the header
    return this.http.post<Ownership>(this.urlEndPoint, ownership, {headers: this.addAuthorizationHeader()})
    .pipe(
      map((response: any) => response.ownership as Ownership),
      catchError( e => {
        if(this.notAuthorized(e)){
          return throwError(e);
        }
        if (e.status = 400) {
          return throwError(e);
        }
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getOwnership(id: any): Observable<Ownership>{
    return this.http.get<Ownership>(`${this.urlEndPoint}/${id}`)
  }

  // The second parameter is for get all data of ownership for update
  updateOwnership(ownership: Ownership): Observable<Ownership>{
    return this.http.put<Ownership>(`${this.urlEndPoint}/${ownership.id}`, ownership, {headers: this.addAuthorizationHeader()})
    .pipe(
      catchError( e => {
        if(this.notAuthorized(e)){
          return throwError(e);
        }
        Swal.fire('Error al editar la propiedad',e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  deleteOwnership(id: number): Observable<Ownership>{
    return this.http.delete<Ownership>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizationHeader()})
    .pipe(
      catchError( e => {
        if(this.notAuthorized(e)){
          return throwError(e);
        }
        Swal.fire('Error al borrar la propiedad',e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  uploadPhoto(file: File, id: any): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    // The name have to be the same of @RequestParam("file") of backend
    formData.append("file", file);
    formData.append("id",id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req);
  }


}
