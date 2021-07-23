import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from './owner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _owner: Owner;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get owner(): Owner{
    if(this._owner != null){
      return this._owner;
    } else if (this._owner == null && sessionStorage.getItem('owner') != null){
      this._owner = JSON.parse(sessionStorage.getItem('owner')) as Owner;
      return this._owner;
    }
    return new Owner();
  }

  public get token(): string | null{
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') as string;
      return this._token;
    } else {
      return null;
    }
  }

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


  saveOwner(accessToken: string): void{
    let payload = this.getPayload(accessToken);
    this._owner = new Owner();
    this._owner.name = payload.owner_name;
    this._owner.lastname = payload.owner_lastname;
    this._owner.email = payload.owner_email;
    this._owner.roles = payload.authorities;
    sessionStorage.setItem('owner',JSON.stringify(this._owner));
  }

  saveToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getPayload(accessToken: string):any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.getPayload(this.token);
    if(payload != null && payload.owner_name && payload.owner_name > 0){
      return true;
    }
    return false;
  }

}
