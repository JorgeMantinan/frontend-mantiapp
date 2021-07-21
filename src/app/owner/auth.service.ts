import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from './owner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(owner: Owner):Observable<any>{
    const urlEndPoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp' + ':' + 'Almendra_34');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales});

    let params = new URLSearchParams();
    params.set('grant_type','password');
    // The oauth use username for the field of authentication. You can see it with make get authentication on postman
    params.set('username',owner.email);
    params.set('password',owner.password);

    return this.http.post<any>(urlEndPoint, params.toString() ,{headers: httpHeaders});
  }

}
