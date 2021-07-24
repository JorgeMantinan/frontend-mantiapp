import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../owner/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  logout():void{
    this.authService.logout();
    Swal.fire('Cierre de sesión', 'Has cerrado la sesión con éxito', 'success');
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
  }

}
