import { Component, OnInit } from '@angular/core';
import { Owner } from './owner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  title: string = 'Iniciar sesión';
  owner: Owner;

  constructor(private authService: AuthService, private router: Router) {
    this.owner = new Owner();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      Swal.fire('Inicio de sesión',`Bienvenido ${this.authService.owner.name} ya estas logueado.`, 'info');
      this.router.navigate(['/ownership']);
    }
  }

  login(): void {
    if(this.owner.email == null || this.owner.password == null){
      Swal.fire("Error al iniciar sesión", 'Usuario y/o contraseña vacíos', 'error');
      return;
    }

    this.authService.login(this.owner).subscribe(response => {
      this.authService.saveOwner(response.access_token);
      this.authService.saveToken(response.access_token);
      let owner = this.authService.owner;
      this.router.navigate(['/ownership'])
      Swal.fire('Sesion iniciada',`Bienvenido ${owner.name}, has iniciado sesión con éxito.`);
    }, err => {
      if(err.status == 400){
        Swal.fire('Error al iniciar sesión', 'Usuario o contraseña incorrectos', 'error');
      }
    });
  }

}
