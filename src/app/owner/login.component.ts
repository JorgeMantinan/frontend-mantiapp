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
  }

  login(): void {
    console.log(this.owner);
    if(this.owner.email == null || this.owner.password == null){
      Swal.fire("Error al iniciar sesión", 'Usuario y/o contraseña vacíos', 'error');
      return;
    }

    this.authService.login(this.owner).subscribe(response => {
      let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      this.router.navigate(['/ownership'])
      console.log(payload);
      Swal.fire('Sesion iniciada',`Bienvenido ${payload.owner_name}, has iniciado sesión con éxito.`);
    });

  }

}
